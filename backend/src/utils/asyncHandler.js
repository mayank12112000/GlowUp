export const asyncHandler = (asyncFunction)=>{
   return async(req,res,next)=>{
    try {
        await asyncFunction(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message
        })
    }
   }
}