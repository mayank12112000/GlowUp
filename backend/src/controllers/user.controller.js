import { CREATE_EMPLOYEE, CREATE_USER, GET_CURRENT_USER_ROLE, INSERT_TOKENS, REMOVE_TOKENS, SELECT_EMP_ROLE_SEQ, SELECT_TOKEN, SELECT_USER, SELECT_USER_BY_USER_SEQ, SELECT_USER_ROLE, SELECT_USER_SEQ, UDPATE_TOKENS } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const validateUser=asyncHandler(async(req,res,next)=>{
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
export const registerUser = asyncHandler(async (req,res)=>{
    const {name,mobile,roleSeq,userName,email,password,isActive} = req.body
   
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
    await runQuery(CREATE_USER,[userName.toLowerCase(),email,hashedPassword,name,mobile,roleSeq?roleSeq:2,isActive])
    
    // after successfully insertion return apiresponse
    return res.status(201).json(new ApiResponse(
        200, {}, "User registered successfully"))
})

export const loginUser=asyncHandler(async(req,res,next)=>{
        const {loginParam,password}= req.body;
    
        if(!loginParam || !password){
            throw new ApiError(400,"User Name/ Email/ Mobile & password are required")
        }
        // const SELECT_USER = "SELECT * FROM USERS WHERE USERNAME = LOWER(?) OR EMAIL = LOWER(?) OR MOBILE = ?"
    
        const users = await runQuery(SELECT_USER,[loginParam,loginParam,loginParam])
        const user = users[0]
        const {isActive} = user
        if(!isActive){
            throw new ApiError(401,"account is in active, contact admin")
        }
        if(!user){
            throw new ApiError(401,"Invalid User Name/ email/ mobile number")
        }
    
        const isPasswordValid = await bcrypt.compare(password,user.password)
    
        if(!isPasswordValid){
            throw new ApiError(401,"Invalid password")
        }

        const role_code = await runQuery(SELECT_USER_ROLE,[user.user_seq])
        const accessToken = jwt.sign(
            {name:user.name,userSeq:user.user_seq, roleCode:role_code[0]?.ROLE_CODE,email:user.email,mobile:user.mobile,isMobileVerified:user.is_mobile_verified},
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

export const logoutUser = asyncHandler(async(req,res,next)=>{
    const userSeq = req.userSeq;
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

export const currentUserRole = asyncHandler(async(req,res,next)=>{
    // GET_CURRENT_USER_ROLE = "SELECT B.ROLE_CODE FROM USERS A LEFT JOIN ROLE B ON A.ROLE_SEQ = B.ROLE_SEQ WHERE USER_SEQ = ?"
    const [response] = await runQuery(GET_CURRENT_USER_ROLE,[req.userSeq])
    res.status(200).json(new ApiResponse(200,{roleCode:response.ROLE_CODE},"role code retrieved"))
})

export const getOtp = asyncHandler(async (req,res,next)=>{
    // TODO : after chosing what service to chose

//     const {mobile} = req.body
//     const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
//     const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
//     const otp = Math.floor(Math.random() * 900000 +100000 )
// console.log(mobile.toString().length)
//     if(!mobile || mobile.toString().length !== 13){
//         throw new ApiError(401,"mobile number is empty or not valid ")
//     }
//     client.messages
//     .create({
//         body: `Your otp to verify your number to Glow up is ${otp}`,
//         from: TWILIO_PHONE_NUMBER,
//         to:mobile
//     })
//     .then(()=>{
//         res.status(200).json(new ApiResponse(200,{},"otp sent successfully"))
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
        throw new ApiError(500,"unable to send otp")
})

export const verifyOtp = asyncHandler(async(req,res,next)=>{

})
