import {  ADD_SERVICE, SELECT_SERVICE, SELECT_SERVICE_NAME, SELECT_SERVICES } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";

export const getAllService= asyncHandler(async(req,res,next)=>{
    const services = await runQuery(SELECT_SERVICES,["%%"])
    res
    .status(200)
    .json(
        new ApiResponse(200,services,"service type got successfully")
    )
})
export const getService = asyncHandler(async(req,res,next)=>{
    const {serviceType} = req.query
    //export const SELECT_SERVICE = "SELECT A.service_seq, A.service_name,a.price,a.discount_percent FROM SERVICE_MASTER A WHERE SERVICE_TYPE_SEQ = ?"
    if(!serviceType){
        throw new ApiError(401,"Service type not available")
    }
    const service = await runQuery(SELECT_SERVICE,[serviceType])
    if(!service){
        throw new ApiError(503,"Service not found")
    }
    res.status(200).json(new ApiResponse(200,service,"Service retrieve successfully"))

})
export const addService = asyncHandler(async(req,res,next)=>{
    const {serviceName,isActive,discount,mrpPrice,serviceType,hours,minutes} = req.body
    if(hours > 12 || minutes>59){
        throw new ApiError(401,"Hours cannot be greater than 12 hours, and minutes cannot exceed 59 minutes")
    }
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
//export const ADD_SERVICE = "INSERT INTO SERVICE_MASTER (SERVICE_NAME,IS_ACTIVE,PRICE,DISCOUNT_PERCENT,SERVICE_TYPE_SEQ,HOURS,MINUTES,CREATED_BY,UPDATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())"

    const resp = await runQuery(ADD_SERVICE,[serviceName,isActive,mrpPrice,discount,serviceType,hours,minutes,req.userSeq,req.userSeq])
    if(!resp){
    throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new ApiResponse(200,{},"Service added successfully"))
    
})