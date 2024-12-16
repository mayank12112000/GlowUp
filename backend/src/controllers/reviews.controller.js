import { SELECT_REVIEWS } from "../queries/queries.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { runQuery } from "../utils/runQuery.js";

export const getReviews = asyncHandler(async(req,res)=>{
    const reviews = await runQuery(SELECT_REVIEWS,null)
    res.status(200).json(new ApiResponse(200,reviews, "reviews fetched successfully"))  
})