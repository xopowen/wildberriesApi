import {WbBaseAPI} from "./WbBaseAPI";
import {WbError, WbErrorData} from "./WbError";
import type {SettingsRequestListNomenclature, Variant, WbResponse, WorkVariant } from "./WbType";



export type PropertyItem = {
    "charcID": Number,
    "subjectName": String,
    "subjectID": Number,
    "name": String,
    "required": Boolean,
    "unitName": String,
    "maxCount": Number,
    "popular": Boolean,
    "charcType": Number
}

export type QueryParamsDefault={locale?: 'ru'| 'en' | 'zh'}

export type Tag = {
    "id": Number,
    "color": 'D1CFD7'| //- серый
        'FEE0E0'| // - красный
        'ECDAFF'| // - фиолетовый
        'E4EAFF'| // - синий
        'DEF1DD'| // - зеленый
        'FFECC7',
    "name": String
}
interface WbContactInterface {
    //donload

    postCreateCard(queryData: Array<{ subjectID: Number; variants: Array<Variant> }>,):
        Promise<WbResponse|undefined >;
    postChangeCard(queryData: Array<WorkVariant>):
        Promise<WbResponse | undefined>;
    postAddNomencltureToCards(queryData: Array<{ imtID: Number, cardsToAdd: Array<Variant> }>):
        Promise<WbResponse | undefined>;
    postUnionORDesunionNomenclature(queryData: { targetIMT: Number, nmIDs: Array<Number> }):
        Promise<WbResponse | undefined>;
    postGenerateBarcodes(queryData: { conut: Number }):
        Promise<WbResponse & { data: Array<String> } | undefined>;

    //show
    //method post
    getListNomenclature(queryData: { settings: SettingsRequestListNomenclature },queryParams?:QueryParamsDefault): Promise<WbResponse & {
        data: Array<String>
    } | WbError>;
    getListNomenclatureNotCreate(queryParams?:QueryParamsDefault): Promise<WbResponse & {
        data: {
            "object": String,
            "vendorCode": String,
            "updateAt": String,//Data
            "errors": Array<String>,
            "objectID": Number
        }
    } | WbError>
    getLimitCreateCard(): Promise<WbResponse & { data: { "freeLimits": Number, "paidLimits": Number } } | WbError>

    //configurator

    getListParentCategory(queryParams?:QueryParamsDefault): Promise<WbResponse & {
        data: Array<{ "name": String, "id": Number, "isVisible": boolean }> | WbError
    }>
    getListSubCategory(queryParams:QueryParamsDefault & {
        name?:String,
        limit?:Number | 1000,
        offset?:Number,
        parentID?:Number
    }): Promise<WbResponse & {
        data: Array<{
            "subjectID": Number,
            "parentID": Number,
            "subjectName": String,
            "parentName": String
        }>
    } | WbError>

    getPropertyItem(subjectId:number,queryParams?:QueryParamsDefault): Promise<WbResponse & { data: Array<PropertyItem> } | WbError>
    getPropertyColor(queryParams?:QueryParamsDefault): Promise<WbResponse & {
        data:Array< {
            "name": String,
            "parentName": String
        }>
    } | WbError>
    getValuePropertyGender(queryParams?:QueryParamsDefault):Promise<WbResponse & {data: Array<String>} | WbError>
    getListPropertyCountryDev(queryParams?:QueryParamsDefault):Promise<WbResponse & {data:Array<
            {
                "name": "Афганистан",
                "fullName": "Исламский Эмират Афганистан"
            }
        >}|WbError>
    getListPropertySeason(queryParams?:QueryParamsDefault): Promise<WbResponse & { data: Array<PropertyItem> } | WbError>
    getPropertyTNVED(queryParams:QueryParamsDefault & {subjectID:Number,integer?:number}):Promise<WbResponse & {data:Array<{
            "tnved": String,
            "isKiz": Boolean
        }>} |WbError>
    getPropertyVat(queryParams?:QueryParamsDefault):Promise<WbResponse & {data:Array<String>}|WbError>

    //media

    postChangeMedia(queryBody:{
        "nmId": Number,
        "data": Array<String>//url
    }):Promise<WbResponse|WbError>
    postAddMedia(queryBody:{uploadfile:BinaryData},queryAddHeder:{'X-Nm-Id':string,'X-Photo-Number':String,"Content-Type":'multipart/form-data'}):Promise<WbResponse|WbError>

    //tags

    getListTag():Promise<WbResponse & {data:Array<Tag>} |WbError>
    postTag(queryBody:Omit<Tag,  'id' >):Promise<WbResponse|WbError>
    patchTag(tagId:Number,queryBody:Omit<Tag,  'id' >):Promise<WbResponse|WbError>
    delTag(tagId:Number):Promise<WbResponse|WbError>
    postAdd_OR_RemoveTagToCard(queryBody:{ "nmID": Number, "tagsIDs": Array<Number> }):Promise<WbResponse|WbError>

    //Basket

    postAddNomenclatureToBasket(queryBody:{nmIDs:Array<Number>}):Promise<WbResponse|WbError>
    postDelNomenclatureFromBasket(queryBody:{nmIDs:Array<Number>}):Promise<WbResponse|WbError>
    postListNomenclatureToBasket(queryBody:SettingsRequestListNomenclature,queryParams?:QueryParamsDefault)

}

export class WbContact extends WbBaseAPI implements WbContactInterface{
    protected additionURL = "/content";
    protected listAPI = {
        cardUpload: this.additionURL + "/v2/cards/upload",
        cardUpdate: this.additionURL + "/v2/cards/update",
        cardAddNomenclature: this.additionURL + "/v2/cards/upload/add",
        nomenclatureUnionORDesUnion: this.additionURL + "/cards/moveNm",
        barcodesGenerate: this.additionURL + "/v2/barcodes",
        listNomenclature: this.additionURL + "/v2/get/cards/list",
        listErrorNomenclature: this.additionURL + "/v2/cards/error/list",
        limitCard: this.additionURL + "/v2/cards/limits",

        //конфигуратор
        listCategory: this.additionURL + "/v2/object/parent/all",
        listItem: this.additionURL + "/v2/object/all",
        propertyItem: (subjectId)=>this.additionURL + "/v2/object/charcs/"+subjectId, // +

        propertyColor: this.additionURL + "/v2/directory/colors",
        propertyGender: this.additionURL + "/v2/directory/kinds",
        propertyCountry: this.additionURL + "/v2/directory/countries",
        propertySeasons: this.additionURL + "/v2/directory/seasons",
        propertyTnved: this.additionURL + "/v2/directory/tnved",
        propertyVat: this.additionURL + "/v2/directory/vat",

        // Медиафайлы
        mediaSwap: this.additionURL + "/v3/media/save",
        mediaAdd: this.additionURL + "/v3/media/file",
        // теги
        listTags: this.additionURL + "/v2/tags",
        tag:(id)=> this.additionURL + "/v2/tag/"+id, // - add , + {id} - del,change
        CardAddOrRemoveTag: this.additionURL + "/v2/tag/nomenclature/link",
        // корзина
        nomenclatureToBasket: this.additionURL + "/v2/cards/delete/trash",
        nomenclatureFromBasket: this.additionURL + "/v2/cards/recover",
        listNomenclatureToBasket: this.additionURL + "/v2/get/cards/trash",
    };

    /**
     *
     * @param { Array<{ subjectID: Number; variants: Array<Variant> }>} queryData
     * @see WbResponse
     * @throws {WbError} - can see in promise.catch
     * @return Promise<WbResponse | undefined >
     */
    async postCreateCard(queryData: Array<{ subjectID: Number; variants: Array<Variant> }>): Promise<WbResponse | undefined > {
        return this.postFetch(this.listAPI.cardAddNomenclature,queryData).then(async (response:Response|undefined)=>{
            if( response?.ok){
                return await response?.json().then((data:WbResponse)=>data)
            }
            return
        })
            .catch((reason:WbErrorData)=>Promise.reject(reason))


    }

}

