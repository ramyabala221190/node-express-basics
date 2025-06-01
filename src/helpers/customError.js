export class CustomError extends Error{
    constructor(message,statusCode){
        super(message); //calling constructor of Error class
        this.message=message;
        this.statusCode=statusCode; //added new property
    }
}