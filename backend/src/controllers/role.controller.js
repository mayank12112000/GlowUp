import { ADD_ROLE, SELECT_ROLE, SELECT_ROLES, SELECT_UNIQUE_ROLE, UPDATE_ROLE } from "../queries/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
const getAllRoles = asyncHandler(async(req,res,next)=>{
    const roles = await runQuery(SELECT_ROLES)
    res
    .status(200)
    .json(
        new ApiResponse(200,roles,"roles got successfully")
    )
})

const getRole = asyncHandler(async(req,res,next)=>{
    const {roleSeq} = req.query
    const roles = await runQuery(SELECT_UNIQUE_ROLE,[roleSeq])
    if(roles.length<1){
        throw new ApiError(401,"No role found")
    }
    res.status(200).json(new ApiResponse(200,roles[0],"role fetched"))
})
const addRole = asyncHandler(async (req,res,next)=>{
    const {roleCode,roleName,isEmployee,isAdmin} = req.body
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
    if(!resp){
    throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new ApiResponse(200,{},"Role added successfully"))
})
const updateRole=asyncHandler(async(req,res,next)=>{
    const userSeq = req.userSeq
    const currentRoleCode = req.currentRoleCode
    const {roleCode,roleName,isEmployee,isAdmin,roleSeq} = req.body
    if([roleCode,roleName,roleSeq].some(field=> !field) || (isEmployee===null || isEmployee===undefined || isAdmin===undefined || isAdmin===null)){
        throw new ApiError(401,"All fields are mandatory")
    }
    if(currentRoleCode!=="ADM"){
        throw new ApiError(401,"You are not authorized to update role")
    }
    //export const UPDATE_ROLE = "UPDATE ROLE SET ROLE_CODE = ?, ROLE_NAME=?,IS_ADMIN = ?, IS_EMPLOYEE = ?, UPDATED_AT = NOW(), UPDATED_BY = ?"
    const resp = await runQuery(UPDATE_ROLE,[roleCode,roleName,isAdmin,isEmployee,userSeq,roleSeq])
    if(!resp){
        throw new ApiError(503,"Internal server error, please try again")
    }
    res.status(200).json(new  ApiResponse(200,"Role updated successfully"))
})
const removeRole = asyncHandler(async(req,res,next)=>{
})

export {getAllRoles,addRole,getRole,updateRole}