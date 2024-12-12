import { ADD_BRANCH, ADD_SERVICE_TYPE, SELECT_BRANCH, SELECT_BRANCHES, SELECT_SERVICE_TYPE } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";

export const getAllServiceTypes= asyncHandler(async(req,res,next)=>{
    const roles = await runQuery(SELECT_SERVICE_TYPE,["%%"])
    console.log(roles)
    res
    .status(200)
    .json(
        new ApiResponse(200,roles,"service type got successfully")
    )
})

export const addServiceType = asyncHandler(async(req,res,next)=>{
    const {serviceTypeName} = req.body
    
    if(!serviceTypeName){
        throw new ApiError(401,"Service type name is mandatory")
    }
    if(req.currentRoleCode !== "ADM"){
        throw new ApiError(403,"You are not authorized to create roles")
    }
    const branch = await runQuery(SELECT_SERVICE_TYPE,[serviceTypeName])
    if(branch.length>0){
        throw new ApiError(403,"Service Type already exists")
    }
//export const ADD_SERVICE_TYPE = "INSERT INTO SERVICE_TYPE_MASTER (SERVICE_TYPE_NAME,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?)"

    const resp = await runQuery(ADD_SERVICE_TYPE,[serviceTypeName,req.userSeq])
    if(!resp){
    throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new ApiResponse(200,{},"Service type added successfully"))
    
})