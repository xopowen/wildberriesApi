import {WbResponse} from "./WbType";


export type  WbError = WbResponse & {
    "error": true,
  } | string;
