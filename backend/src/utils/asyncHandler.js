export const asyncHandler = (asyncFunction)=>{
   return async(req,res,next)=>{
    try {
        await asyncFunction(req,res,next)
    } catch (error) {
        res.status(error.statusCode || 500).json({
            statusCode:error.statusCode || 500,
            success:false,
            message:error.message
        })
    }
   }
}