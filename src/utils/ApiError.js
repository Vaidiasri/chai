class ApiError extends Error{
    constructor(
        statusCode,
        message="Somthing went wrong",
        errors=[],
        statck=""
    ){
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.succes=false
        this.errors=errors


        if(statck){
            this.stack=statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export default ApiError