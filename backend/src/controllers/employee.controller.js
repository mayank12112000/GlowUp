import { CREATE_EMPLOYEE, CREATE_USER, SELECT_EMP_ROLE_SEQ,SELECT_EMPLOYEE,SELECT_USER, SELECT_USER_SEQ } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import bcrypt from "bcrypt"

export const registerEmployee = asyncHandler(async (req,res)=>{
    const {name,mobile,userName,email,isActive} = req.body
    const password = "glowup2024"
    if(req.currentRoleCode!=="ADM"){
        throw new ApiError(401,"You are not authorised to create employee")
    }
    if ([name, mobile, password, userName, email].some(field => !field)) {
        throw new ApiError(400, "All fields are required");
    }
    if(password.length<8){
        throw new ApiError(400,"Password must have atlease 8 characters")
    }
    // check if users already exits
    const user = await runQuery(SELECT_USER,[userName,email,mobile])
    if(user?.length > 0){
        throw new ApiError(401,"User name/ email id/ mobile number already exists")
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password,10)
    const role = await runQuery(SELECT_EMP_ROLE_SEQ)
    const {roleSeq} = await role[0]
    // insert into users table
    await runQuery(CREATE_USER,[userName.toLowerCase(),email,hashedPassword,name,mobile,roleSeq,isActive])

    //export const SELECT_USER_SEQ = "SELECT USER_SEQ FROM USERS WHERE USERNAME= ?"
    const empUser = await runQuery(SELECT_USER_SEQ,[userName])
    const {empUserSeq} = await empUser[0]
//export const CREATE_EMPLOYEE = "INSERT INTO EMPLOYEE_MASTER (NAME,USER_SEQ,CREATED_BY,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
    const res1 =await runQuery(CREATE_EMPLOYEE,[name,empUserSeq,req.userSeq])
    // after successfully insertion return apiresponse
    return res.status(201).json(new ApiResponse(
        200, {}, "User registered successfully"))
})

export const getAllEmployee = asyncHandler(async(req,res,next)=>{
    const {active} = req.query
    const employee = await runQuery(SELECT_EMPLOYEE + (active==="true"?" WHERE u.isactive = true":active==="false"?" where u.isactive = false":""))
    if(!employee){
        throw new ApiError(503,"employee retrieval failed")
    }
    res.status(200).json(new ApiResponse(200,employee,"employee retrieved successfully"))
})