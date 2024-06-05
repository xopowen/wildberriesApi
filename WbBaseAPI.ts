import { WbError } from "./WbError";
import {WbResponse} from "./WbType";


interface wbFetch {
  getFetch(url: string): Promise<WbResponse|undefined|any>
  postFetch(url: string, body: any): Promise<WbResponse|undefined|any>
  apiFetch(url:string,method:'GET'|'POST'|'PUT'|'DELETE',body?:undefined|'object'|'string'  ):Promise<WbResponse|undefined|any>

}

interface wbFetchFull extends wbFetch{
  delFetch(url: string): Promise<Response>
  pathFetch(url: string): Promise<Response>
}

export class WbBaseAPI implements wbFetch{
  protected wildberriesRU_URL = 'https://suppliers-api.wildberries.ru'

  async getFetch(url: string): Promise<any> {
    return this.apiFetch(url,'GET')  
  }
  async postFetch(url: string, body: any): Promise<any>{
    return this.apiFetch(url,'POST',body)
  }

  async apiFetch(url:string,method:'GET'|'POST'|'PUT'|'DELETE',body?:undefined):Promise<any>{
       let init:RequestInit = {
         method:method,
         headers:{
           Authorization:`${this.token}`,
           'Content-Type':'application/json'
         }
       }
       if(body){
         init.body = JSON.stringify(body)
       }
       return  fetch(url, init).then(async(response:Response)=>{
         if(response.status === 200){
           return await response.json()
         }else{
           await response.json().then((data:{responseError:{status:Number,statusText:String},responseData:WbError|any})=>{
              return Promise.reject({responseError:{status:response.status,statusText:response.statusText},responseData:data})
           })
         }
       })
  }
  constructor(protected token:string){

  }
}