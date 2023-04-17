const asyncHandler = fn => async (req, res, next) => {
    try{
        await fn(req, res, next)
    }
    catch(err){
        console.log(err);
        throw(err)
    };
}    

module.exports = asyncHandler