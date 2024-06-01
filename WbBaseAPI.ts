import { WbError } from "./WbError";






interface wbFetch {
  getFetch(url: string): Promise<Response>
  postFetch(url: string, body: any): Promise<Response>
  apiFetch(url:string,method:'GET'|'POST'|'PUT'|'DELETE',body?:'undefine'|'object'|'string'  ):Promise<any|undefined>

}

interface wbFetchFull extends wbFetch{
  delFetch(url: string): Promise<Response>
  pathFetch(url: string): Promise<Response>
}

export class WbBaseAPI implements wbFetch{
  protected wildberriesRU_URL = 'https://suppliers-api.wildberries.ru'

  async getFetch(url: string): Promise<Response> {
    return this.apiFetch(url,'GET')  
  }
  async postFetch(url: string, body: any): Promise<Response>{
    return this.apiFetch(url,'POST',body)
  }

  async apiFetch(url:string,method:'GET'|'POST'|'PUT'|'DELETE',body?:'undefine'){
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
           return response.json()
         }else{
           await response.json().then((data:WbError)=>{
              return Promise.reject(data)
           })
         }
       })
  }
  constructor(protected token:string){

  }
}