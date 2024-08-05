

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }


export class ApiResponse {
    constructor(statusCode,data,message = 'success'){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export class ApiError extends Error{
    constructor(statusCode,message = 'something went wrong',errors= [],stack = ''){
        super(message)
        this.data = null
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.success = false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

