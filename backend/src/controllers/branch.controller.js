import { ADD_BRANCH, SELECT_BRANCH, SELECT_BRANCHES } from "../queries/queries.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";

export const getAllBranches= asyncHandler(async(req,res,next)=>{
    const roles = await runQuery(SELECT_BRANCHES)
    res
    .status(200)
    .json(
        new ApiResponse(200,roles,"roles got successfully")
    )
})

export const addBranch = asyncHandler(async(req,res,next)=>{
    const {branchName,branchAddress} = req.body
    
    if([branchName,branchAddress].some(field=> !field) || (branchAddress===null || branchName===undefined)){
        throw new ApiError(401,"All fields are mandatory")
    }
    if(req.currentRoleCode !== "ADM"){
        throw new ApiError(403,"You are not authorized to create roles")
    }
    const branch = await runQuery(SELECT_BRANCH,[branchName])
    if(branch.length>0){
        throw new ApiError(403,"Branch Name already exists")
    }
//  export const ADD_ROLE = 'INSERT INTO ROLE (IS_ADMIN,ISEMPLOYEE,ROLE_CODE,ROLE_NAME,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,NOW(),NOW())'
    const resp = await runQuery(ADD_BRANCH,[branchName,branchAddress])
    if(!resp){
    throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new ApiResponse(200,{},"Branch added successfully"))
    
})