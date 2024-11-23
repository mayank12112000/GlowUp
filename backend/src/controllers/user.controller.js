import { CREATE_USER, GET_CURRENT_USER_ROLE, INSERT_TOKENS, REMOVE_TOKENS, SELECT_TOKEN, SELECT_USER, SELECT_USER_BY_USER_SEQ, SELECT_USER_ROLE, UDPATE_TOKENS } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const validateUser=asyncHandler(async(req,res,next)=>{
    const token= req.headers.authorization.replace("Bearer ","")
    if(!token){
        return res.status(401).json({isValid:false})
    }
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!decoded.userSeq){
            return res.status(401).json({isValid:false})
        }else{
            return res.status(200).json({isValid:true})
        }
    } catch (error) {
        throw new ApiError(503,"Something went wrong while validating user")
    }
})

const registerUser = asyncHandler(async (req,res)=>{
    const {name,mobile,roleSeq,userName,email,password} = req.body
   
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

    // insert into users table
    await runQuery(CREATE_USER,[userName.toLowerCase(),email,hashedPassword,name,mobile,roleSeq?roleSeq:2])
    
    // after successfully insertion return apiresponse
    return res.status(201).json(new ApiResponse(
        200, {}, "User registered successfully"))
})

const loginUser=asyncHandler(async(req,res,next)=>{
        const {loginParam,password}= req.body;
    
        if(!loginParam || !password){
            throw new ApiError(400,"User Name/ Email/ Mobile & password are required")
        }
        // const SELECT_USER = "SELECT * FROM USERS WHERE USERNAME = LOWER(?) OR EMAIL = LOWER(?) OR MOBILE = ?"
    
        const users = await runQuery(SELECT_USER,[loginParam,loginParam,loginParam])
        const user = users[0]
        if(!user){
            throw new ApiError(401,"Invalid User Name/ email/ mobile number")
        }
    
        const isPasswordValid = await bcrypt.compare(password,user.password)
    
        if(!isPasswordValid){
            throw new ApiError(401,"Invalid password")
        }
        // const SELECT_USER_ROLE = 'SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?'

        const role_code = await runQuery(SELECT_USER_ROLE,[user.user_seq])
        const accessToken = jwt.sign(
            {userSeq:user.user_seq, roleCode:role_code[0]?.ROLE_CODE},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
        )
    
        const refreshToken = jwt.sign(
            { userSeq: user.user_seq },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
    
        const existingToken = await runQuery(SELECT_TOKEN,[user.user_seq])
        
        if(existingToken.length>0){
            // UDPATE_TOKENS = "UPDATE  USER_TOKENS(ACCESS_TOKEN=?,REFRESH_TOKEN=?,CREATED_AT=NOW(),UPDATED_AT=NOW() WHERE USER_SEQ = ?)"
            await runQuery(UDPATE_TOKENS,[accessToken,refreshToken,user.user_seq])
        }else{
            // "INSERT INTO USER_TOKENS(USER_SEQ,ACCESS_TOKEN,REFRESH_TOKEN,CREATED_AT,UPDATED_AT) VALUES(?,?,?,NOW(),NOW())"
            await runQuery(INSERT_TOKENS,[user.user_seq,accessToken,refreshToken])
        }
        const options= {
            httpOnly:true,
            secure:true,
        }
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(new ApiResponse(200,{accessToken,refreshToken,userSeq:user.user_seq,roleCode:role_code[0].ROLE_CODE},"Login successful"))
    
})

const logoutUser = asyncHandler(async(req,res,next)=>{
    const userSeq = req.userSeq;
    console.log(userSeq)
//    SELECT_USER_BY_USER_SEQ = "SELECT * FROM USERS WHERE USER_SEQ = ?"

    const user = await runQuery(SELECT_USER_BY_USER_SEQ,[userSeq])
    
    // remove tokens from db
//   REMOVE_TOKENS = "UPDATE user_tokens SET access_token = null,refresh_token=null WHERE user_seq = ?"
    const resp = await runQuery(REMOVE_TOKENS,[userSeq])
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))

})

const currentUserRole = asyncHandler(async(req,res,next)=>{
    // GET_CURRENT_USER_ROLE = "SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?"
    const [response] = await runQuery(GET_CURRENT_USER_ROLE,[req.userSeq])
    res.status(200).json(new ApiResponse(200,{roleCode:response.ROLE_CODE},"role code retrieved"))
})

export {registerUser,loginUser,validateUser,logoutUser,currentUserRole}