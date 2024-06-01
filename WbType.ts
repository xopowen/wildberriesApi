export type WbResponse = {
  data: null | Object | Array<Object>;
  error: Boolean;
  errorText: string;
  additionalErrors: null | Object | String;
};

//contact
export type Dimensions = {
  length: Number;
  width: Number;
  height: Number;
};
export type CharacteristicVariant = {
  id: Number;
  value: Array<String> | string;
};
export type SizesVariant = {
  techSize: String;
  wbSize: String;
  price: Number;
  skus: Array<String>;
};
export type Variant = {
  vendorCode: String; //"АртикулПродавца",
  title: String; // "Наименование товара",
  description: String; //"Описание товара",
  brand: String; // "Бренд",
  dimensions: Dimensions;
  characteristics: Array<CharacteristicVariant>;
  sizes: Array<SizesVariant>;
};
export type WorkVariant = Variant & { nmID: Number };
export type RequestDataCardProduct = {
  subjectID: Number;
  variants: Array<Variant>;
};
export type SettingsRequestListNomenclature = {
  sort: {
    //Сортировать по полю updatedAt (false - по убыванию, true - по возрастанию)
    ascending: Boolean;
  },
  filter: {
     // 0 - без фото, 1 - с фото, -1 - с фото и без
    withPhoto: 0 | 1 | -1,
    //Поиск по артикулу продавца, артикулу WB, баркоду
    textSearch: String,
    tagIDs:Array<Number>,
    allowedCategoriesOnly:Boolean,    
    objectIDs:Array<Number>,
    brands:Array<String>,
    imtID:Number,
  },
  cursor: Cursor & {limit: Number}
};

export type NomenclatureCard = {
  nmID: Number;
  imtID: Number;
  nmUUID: String;
  subjectID: Number;
  subjectName: String;

  dimensions: Dimensions;
  characteristics: Array<
    CharacteristicVariant & { name: String; value: Array<String> }
  >;
  sizes: Array<{
    chrtID: Number;
    techSize: String;
    skus: Array<String>;
  }>;
  tags: Array<{
    id: Number;
    name: String;
    color: String;
  }>;
  createdAt: String; //Date
  updatedAt: String; //Date
};

export type Cursor = {
  updatedAt: String;
  nmID: Number;
};
export type listNomenclature = {
  cards: Array<NomenclatureCard>;
  cursor: Cursor & { total: Number };
};
