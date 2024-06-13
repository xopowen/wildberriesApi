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
  protected wildberriesRU_URL: unknown

  async getFetch(url: string): Promise<any|undefined> {
    return this.apiFetch(url,'GET').then(async (response)=>{
        if(response?.ok){
            return await response.json()
        }
        return
    })
  }
  async postFetch(url: string, body: any): Promise<any|undefined>{
    return this.apiFetch(url,'POST',body).then(async (response)=>{
        if(response?.ok){
            return await response.json()
        }
        return
    })
  }

  async apiFetch(url:string,method:'GET'|'POST'|'PUT'|'DELETE',body?:undefined):Promise<Response|undefined>{
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
         if(response.ok){
           return response
         }else{
           await response.json().then((data:{status:Number,statusText:String,errorData:any})=>{
              return Promise.reject({status:response.status,statusText:response.statusText,errorData:data})
           })
         }
       })
  }
  constructor(protected token:string){

  }
}