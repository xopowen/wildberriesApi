import {WbResponse} from "./WbType";

type WbErrorWithCode = {
    "code": Number,
    "message": String
}
type WbErrorOnlyMassages = {
    "errors": Array<String>
}
export type  WbErrorData = WbResponse & { error: true }
    | WbErrorWithCode
    | WbErrorOnlyMassages
    | string  ;

export enum StatusErrorWithData {
    'c400'=400,
    'c403' = 403,
    'c500'=500
}
export type StatusErrorWithCode = 401|429
export type WbError =    {
        status:StatusErrorWithData,
        statusText:String,
        errorData: WbResponse & { error: true }
} |
    {
        status:StatusErrorWithCode,
        statusText:String,
        errorData: WbErrorWithCode
    }
type PaidAcceptedError400 = {
    "title": String,
    "detail": String,
    "requestId": String,
    "origin":String
}
/**
 * @param status = 400
 * @param {WbErrorOnlyMassages} errorData
 * @see WbErrorOnlyMassages
 */
export type WbErrorRaid = WbError & {status:400,errorData:WbErrorOnlyMassages}
export type WbErrorWithTitle = WbError & {status:400,errorData:PaidAcceptedError400}
export type WbErrorWith500 = WbError & {status:500,errorData: {
        "error": true,
        "errorText":string
    }}