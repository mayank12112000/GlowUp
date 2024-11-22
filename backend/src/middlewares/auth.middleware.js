import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt  from 'jsonwebtoken';
import { runQuery } from "../utils/runQuery.js";
import { SELECT_SINGLE_USER } from "../queries/queries.js";

export const verifyJWT=asyncHandler(async(req,_,next)=>{
        const authHeader = req.headers['authorization']; // Get the Authorization header

        if (!authHeader) {
            throw new ApiError(403,"authoriztion missing")        
        }
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("token for validation",token)
    
        if(!token){
            throw new ApiError(401,"Unauthorized request: Please Re-login")
        }
    
        const decodedTokenInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        //const SELECT_SINGLE_USER = "SELECT * FROM USERS WHERE USER_SEQ = ?"
        const userSeq = await runQuery(SELECT_SINGLE_USER,[decodedTokenInfo?.userSeq])
        if(!userSeq){
            throw new ApiError(401,"Invalid access: User not found. Please re-login")
        }
        req.userSeq = userSeq
        next()
    
})