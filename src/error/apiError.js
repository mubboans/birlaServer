class apiError {
    constructor (code,message,success,error){
        this.code=code,
        this.message=message,
        this.success = success,
        this.error = error
    }

    static BadRequest (mssg,error){
        return new apiError (400,mssg,false,error)
    }

    static InternalServerError(mssg){
        return new apiError(500,mssg)
    }

    static NotFound(mssg){
        new apiError(404,mssg)
    }
} 
module.exports = apiError