import { WbBaseAPI } from "./WbBaseAPI";
import { WbError } from "./WbError";
import type { SettingsRequestListNomenclature, Variant, WbResponse, WorkVariant } from "./WbType";



interface wbContact {
  //donload
  
  createCard(data: Array<{ subjectID: Number; variants: Variant }>,): Promise<WbResponse | WbError>;
  changeCard(data: Array<WorkVariant>): Promise<WbResponse | WbError>;
  addNomencltureToCards(data: Array<{imtID:Number,cardsToAdd:Array<Variant>}>): Promise<WbResponse | WbError>;
  unionORDesunionNomenclature(data:{targetIMT:Number,nmIDs:Array<Number>}): Promise<WbResponse | WbError>;
  toGenerateBarcodes(data:{conut:Number}): Promise<WbResponse & {data:Array<String>} | WbError>;

  //show
  getListNomenclature(data:{settings:SettingsRequestListNomenclature}): Promise<WbResponse & {data:Array<String>} | WbError>;
  
}

export class WbContact extends WbBaseAPI {
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
    propertyItem: this.additionURL + "/v2/object/charcs", // + {subjectId}

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
    tag: this.additionURL + "/v2/tag", // - add , + {id} - del,change
    CardAddOrRemoveTag: this.additionURL + "/v2/tag/nomenclature/link",
    // корзина
    nomenclatureToBascet: this.additionURL + "/v2/cards/delete/trash",
    nomenclatureFromBascet: this.additionURL + "/v2/cards/recover",
    listNomenclatureToBascet: this.additionURL + "/v2/get/cards/trash",
  };
}
