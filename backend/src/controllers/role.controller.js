import { ADD_ROLE, SELECT_ROLE, SELECT_ROLES } from "../queries/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
const getAllRoles = asyncHandler(async(req,res,next)=>{
    const roles = await runQuery(SELECT_ROLES)
    console.log("sdfasd",roles)
    res
    .status(200)
    .json(
        new ApiResponse(200,roles,"roles got successfully")
    )
})

const addRole = asyncHandler(async (req,res,next)=>{
    const {roleCode,roleName,isEmployee,isAdmin} = req.body
  console.log(isEmployee,isAdmin)
    if([roleCode,roleName].some(field=> !field) || (isEmployee===null || isEmployee===undefined || isAdmin===undefined || isAdmin===null)){
        throw new ApiError(401,"All fields are mandatory")
    }
    if(req.currentRoleCode !== "ADM"){
        throw new ApiError(403,"You are not authorized to create roles")
    }
    const role = await runQuery(SELECT_ROLE,[roleCode,roleName])
    if(role.length>0){
        throw new ApiError(403,"Role code/ Role name already exists")
    }
//  export const ADD_ROLE = 'INSERT INTO ROLE (IS_ADMIN,ISEMPLOYEE,ROLE_CODE,ROLE_NAME,CREATED_BY,CREATED_ON,UPDATED_ON) VALUES(?,?,?,?,?,NOW(),NOW())'
    const resp = await runQuery(ADD_ROLE,[isAdmin,isEmployee,roleCode,roleName,req.userSeq])
    res.status(200).json(new ApiResponse(200,{},"Role added successfully"))
})

const removeRole = asyncHandler(async(req,res,next)=>{
    // to do after making verify jwt middleware
})

export {getAllRoles,addRole}