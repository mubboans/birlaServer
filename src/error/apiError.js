class apiError {
    constructor (code,message,success,error,status){
        this.code=code,
        this.message=message,
        this.success = success,
        this.error = error,
        this.status=status
    }

    static BadRequest (mssg,error){
        return new apiError (400,mssg,false,error,'Failed')
    }

    static InternalServerError(mssg,error){
        return new apiError(500,mssg,false,error,'Failed')
    }

    static NotFound(mssg){
        new apiError(404,mssg,false,error,'Failed')
    }
} 
module.exports = apiError