import { asyncHandler } from "../utils/asyncHandler.js";
import { SELECT_PRODUCT } from './../queries/queries.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { runQuery } from "../utils/runQuery.js";
export const createProduct = asyncHandler(async(req,res)=>{
     const {productName,isActive,discount,mrpPrice,productType} = req.body
        
        if([productName,isActive,mrpPrice,productType].some(field=> !field)){
            throw new ApiError(401,"All fields are mandatory")
        }
        if(req.currentRoleCode !== "ADM"){
            throw new ApiError(403,"You are not authorized to create roles")
        }
        //export const SELECT_SERVICE_NAME = "SELECT SERVICE_NAME FROM SERVICE_MASTER WHERE SERVICE_NAME = ?"
        const product = await runQuery(SELECT_SERVICE_NAME,[productName])
        if(service.length>0){
            throw new ApiError(403,"Service Type already exists")
        }
    //export const ADD_SERVICE = "INSERT INTO SERVICE_MASTER (SERVICE_NAME,IS_ACTIVE,PRICE,DISCOUNT_PERCENT,SERVICE_TYPE_SEQ,HOURS,MINUTES,CREATED_BY,UPDATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,?,?,?,?,NOW(),NOW())"
    
        const resp = await runQuery(ADD_SERVICE,[productName,isActive,mrpPrice,discount,productType,hours,minutes,req.userSeq,req.userSeq])
        if(!resp){
        throw new ApiError(503,"Internal server error, please try again")
        }
        res.status(200).json(new ApiResponse(200,{},"Service added successfully"))
        
})

export const getAllProducts = asyncHandler(async(req,res)=>{
    const {active} = req.query
    const employee = await runQuery(SELECT_PRODUCT + (active==="true"?" WHERE ISACTIVE = TRUE":active==="false"?" WHERE ISACTIVE = FALSE":""))
    if(!employee){
        throw new ApiError(503,"employee retrieval failed")
    }
    res.status(200).json(new ApiResponse(200,employee,"employee retrieved successfully"))
})