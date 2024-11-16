export const asyncHandler = async (asyncFunction) => {
    try {
        const result = await asyncFunction; // Await the passed-in function's result
        return result;
    } catch (error) {
        return { data: null, error: error.message };
    }
};
