import { CREATE_USER, SELECT_USER } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import bcrypt from "bcrypt"
const registerUser = asyncHandler(async (req,res)=>{
    const {name,mobile,roleSeq,userName,email,password} = req.body

    if (!name || !mobile || !password || !userName || !roleSeq || !email) {
        throw new ApiError(400, "All fields are required");
    }
    

    // check if users already exits
    const {results} = await runQuery(SELECT_USER,[userName,email,mobile])
    if(results?.length > 0){
        throw new ApiError(403,"user name/email id/mobile number already exists")
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password,10)

    // insert into users table
    // "INSERT INTO USERS (USERNAME,EMAIL,PASSWORD,NAME,MOBILE,ROLE_SEQ,CREATED_AT,UPDATED_AT) VALUES (?,?,?,?,?,?,NOW(),NOW())"

    const result = await runQuery(CREATE_USER,[userName.toLowerCase(),email,hashedPassword,name,mobile,roleSeq])
    
    // after successfully insertion return apiresponse
    return res.status(201).json(new ApiResponse(
        200, {}, "user registered successfully"))
})

export {registerUser}