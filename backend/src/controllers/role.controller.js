import { SELECT_ROLES } from "../queries/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";
import {ApiResponse} from "../utils/ApiResponse.js"
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
    // to do after making verify jwt middleware
})

const removeRole = asyncHandler(async(req,res,next)=>{
    // to do after making verify jwt middleware
})

export {getAllRoles,addRole}