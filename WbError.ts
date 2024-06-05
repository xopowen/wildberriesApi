import {WbResponse} from "./WbType";

type WbErrorWithCode = {
    "code": Number,
    "message": String
}
type WbErrorOnlyMassages = {
    "errors": Array<String>
}
export type  WbError = WbResponse & {
    //status error
    error: true,
  } | WbErrorWithCode |WbErrorOnlyMassages | string;

