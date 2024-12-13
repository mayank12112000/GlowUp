import {  ADD_SERVICE, SELECT_SERVICE_NAME, SELECT_SERVICES } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";

export const getAllService= asyncHandler(async(req,res,next)=>{
    const roles = await runQuery(SELECT_SERVICES,["%%"])
    res
    .status(200)
    .json(
        new ApiResponse(200,roles,"service type got successfully")
    )
})

export const addService = asyncHandler(async(req,res,next)=>{
    const {serviceName,isActive,discount,mrpPrice,serviceType,} = req.body
    
    if([serviceName,isActive,mrpPrice,serviceType].some(field=> !field)){
        throw new ApiError(401,"All fields are mandatory")
    }
    if(req.currentRoleCode !== "ADM"){
        throw new ApiError(403,"You are not authorized to create roles")
    }
    //export const SELECT_SERVICE_NAME = "SELECT SERVICE_NAME FROM SERVICE_MASTER WHERE SERVICE_NAME = ?"
    const service = await runQuery(SELECT_SERVICE_NAME,[serviceName])
    if(service.length>0){
        throw new ApiError(403,"Service Type already exists")
    }
//export const ADD_SERVICE = "INSERT INTO SERVICE_MASTER (SERVICE_NAME,IS_ACTIVE,PRICE,DISCOUNT_PERCENT,SERVICE_TYPE_SEQ,CREATED_BY,UPDATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,?,?,NOW(),NOW())"

    const resp = await runQuery(ADD_SERVICE,[serviceName,isActive,mrpPrice,discount,serviceType,req.userSeq,req.userSeq])
    if(!resp){
    throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new ApiResponse(200,{},"Service added successfully"))
    
})