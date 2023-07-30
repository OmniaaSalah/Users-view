export enum HttpStatusCodeEnum{
    MethodNotAllowed='MethodNotAllowed', // req body (file) is empty
    NonAuthoritativeInformation='NonAuthoritativeInformation', //user not allowed to do this action
    NotAcceptable='NotAcceptable', //data in the req body or file not valid
    BadRequest='BadRequest',  //connection error
    OK="OK",
    Ok="Ok",
    Unauthorized="Unauthorized",
    Created='Created'
}
