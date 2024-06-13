import {WbBaseAPI} from "./WbBaseAPI";
import {WbResponse} from "./WbType";
import {Tag} from "./WbContact";
import {WbError, WbErrorData} from "./WbError";

/**
 * TODO made doc
 */
export enum FiendSort {
    openCard = 'openCard',
    addToCart = 'addToCart',
    orders = 'orders',
    avgRubPrice = 'avgRubPrice',
    ordersSumRub = 'ordersSumRub',
    stockMpQty = 'stockMpQty',
    stockWbQty = 'stockWbQty',
    cancelSumRub = 'cancelSumRub',
    cancelCount = 'cancelCount',
    buyoutCount = 'buyoutCount',
    buyoutSumRub = 'buyoutSumRub '
}

enum StatusCreatingJemReport {
    /**
     * в очереди на обработку
     */
    WAITING = 'WAITING',
    /**
     * генерируется
     */
    PROCESSING = 'PROCESSING',
    /**
     * готов
     */
    SUCCESS = 'SUCCESS',
    /**
     * ожидает повторной обработки
     */
    RETRY = 'RETRY' ,
    /**
     * не получилось сгенерировать
     */
    FAILED = 'FAILED'
}

enum StatusCratingStoragePaidReport {
    /**
     * новое
     */
    new = 'new',
    /**
     *  обрабатывается
     */
    processing = "processing",
    /**
     * отчёт готов
     */
    done = "done",
    /**
     * отчёт удалён
     */
    purged = "purged",
    /**
     * отклонено
     */
    canceled = 'canceled'
}


type ShameRequestStaticCard =
    {
    /**
     * Название бренда
     * @type {Array<string>}
     * @memberof NmReportDetailRequest
     */
    brandNames?: Array<string>;
    /**
     * Идентификатор предмета
     * @type {Array<number>}
     * @memberof NmReportDetailRequest
     */
    objectIDs?: Array<number>;
    /**
     * Идентификатор тега
     * @type {Array<number>}
     * @memberof NmReportDetailRequest
     */
    tagIDs?: Array<number>;
    /**
     * Артикул WB
     * @type {Array<number>}
     * @memberof NmReportDetailRequest
     */
    nmIDs?: Array<number>;
    /**
     * Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow.
     * @type {string}
     * @memberof NmReportDetailRequest
     */
    timezone?: string;
    /**
     *
     * @type {StaticPeriod}
     * @memberof NmReportDetailRequest
     */
    "period": StaticPeriod,
    "orderBy"?: {
        "field": FiendSort,
        "mode": string
    },
    /**
     * Страница
     * @type {number}
     * @memberof NmReportDetailRequest
     */
    page: number;
}
type CardObject = {
    /**
     * Идентификатор предмета
     * @type {number}
     * @memberof NmReportDetailResponseDataObject
     */
    id: number;
    /**
     * Название предмета
     * @type {string}
     * @memberof NmReportDetailResponseDataObject
     */
    name: string;
}
/**
 * @TODO проверить обязательность параметров
 * @param begin - Data format yy-mm-dd
 * @param end - Data format yy-mm-dd
 */
type StaticPeriod = {
    /**
     *  Data format yy-mm-dd
     */
    "begin": string,//Data
    /**
     *  Data format yy-mm-dd
     */
    "end": string,//Data
}
/**
 *
 * @description data format RFC3339
 * @example
 * 2023-12-01
 * 2023-12-01T23:59:59
 * 2023-12-01T00:00:00.12345
 * 2023-12-01T00:00:00
 *
 */
type PeriodFromTo = {
    dateFrom: string,
    dateTo: string
}
/**
 *
 * @description data format RFC3339
 * @example
 * 2023-12-01
 *
 */
type PeriodFromToData = PeriodFromTo
/**
 * Конверсии
 * @export
 * @interface NmReportDetailResponseDataStatisticsPeriodComparisonConversions
 */
export interface NmReportDetailResponseDataStatisticsPeriodComparisonConversions {
    /**
     * Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину)
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparisonConversions
     */
    addToCartPercent: number;
    /**
     * Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ)
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparisonConversions
     */
    cartToOrderPercent: number;
    /**
     * Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.)
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparisonConversions
     */
    buyoutsPercent: number;
}
/**
 * Сравнение двух периодов, в процентах
 */
type NmReportDetailResponseDataStatisticsPeriodComparison = {
    /**
     * Динамика переходов в карточку товара
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    openCardDynamics: number;
    /**
     * Динамика добавлений в корзину
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    addToCartDynamics: number;
    /**
     * Динамика количества заказов
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    ordersCountDynamics: number;
    /**
     * Динамика суммы заказов, рублей
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    ordersSumRubDynamics: number;
    /**
     * Динамика выкупов, штук
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    buyoutsCountDynamics: number;
    /**
     * Динамика суммы выкупов, рублей
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    buyoutsSumRubDynamics: number;
    /**
     * Динамика отмен товаров, штук
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    cancelCountDynamics: number;
    /**
     * Динамика сумм отмен товаров, рублей
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    cancelSumRubDynamics: number;
    /**
     * Динамика среднего количества заказов в день
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    avgOrdersCountPerDayDynamics: number;
    /**
     * Динамика средней цены на товары. Учитываются скидки для акций и WB скидка.
     * @type {number}
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    avgPriceRubDynamics: number;
    /**
     *
     * @memberof NmReportDetailResponseDataStatisticsPeriodComparison
     */
    "conversions": NmReportDetailResponseDataStatisticsPeriodComparisonConversions
}
type NmReportDetailResponseDataStatisticsPeriod = NmReportDetailResponseDataStatisticsPeriodComparison & StaticPeriod
export interface NmReportDetailResponseDataStocks {
    /**
     * Остатки МП, шт. (Общее количество остатков на складе продавца)
     * @type {number}
     * @memberof NmReportDetailResponseDataStocks
     */
    stocksMp: number;
    /**
     * Остатки на складах Wildberries (Общее количество остатков на складах Wildberries)
     * @type {number}
     * @memberof NmReportDetailResponseDataStocks
     */
    stocksWb: number;
}
type NmCardStatistic = {
    /**
     * Артикул WB
     * @type {number}
     * @memberof NmReportDetailResponseDataCards
     */
    nmID: number;
    /**
     * Артикул продавца
     * @type {string}
     * @memberof NmReportDetailResponseDataCards
     */
    vendorCode: string;
    /**
     * Название бренд
     * @type {string}
     * @memberof NmReportDetailResponseDataCards
     */
    brandName: string;
    /**
     * Теги
     * @type {Array<Tag>}
     * @memberof NmReportDetailResponseDataCards
     */
    "tags": Array<Omit<Tag, 'color'>>,
    "object": CardObject,
    "statistics": {
        "selectedPeriod": NmReportDetailResponseDataStatisticsPeriod,
        "previousPeriod": NmReportDetailResponseDataStatisticsPeriod,
        "periodComparison": NmReportDetailResponseDataStatisticsPeriodComparison
    },
    "stocks":NmReportDetailResponseDataStocks
}
type uuid = string
export interface NmReportDetailHistoryResponseHistory {
    /**
     * Дата
     * @type {string}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    dt: string;
    /**
     * Количество переходов в карточку товара
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    openCardCount: number;
    /**
     * Положили в корзину, штук
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    addToCartCount: number;
    /**
     * Заказали товаров, шт
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    ordersCount: number;
    /**
     * Заказали на сумму, руб.
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    ordersSumRub: number;
    /**
     * Выкупили товаров, шт.
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    buyoutsCount: number;
    /**
     * Выкупили на сумму, руб.
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    buyoutsSumRub: number;
    /**
     * Процент выкупа, % (Какой процент посетителей, заказавших товар, его выкупили. Без учёта товаров, которые еще доставляются покупателю.)
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    buyoutPercent: number;
    /**
     * Конверсия в корзину, % (Какой процент посетителей, открывших карточку товара, добавили товар в корзину)
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    addToCartConversion: number;
    /**
     * Конверсия в заказ, % (Какой процент посетителей, добавивших товар в корзину, сделали заказ)
     * @type {number}
     * @memberof NmReportDetailHistoryResponseHistory
     */
    cartToOrderConversion: number;
}
type ParamsItemNmID = {
    /**
     * `nmID `, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт по всем товарам
     * @type {Array<number>}
     * 
     */
    nmIDs?: Array<number>;
    /**
     * Идентификаторы предметов
     * @type {Array<number>}
     * 
     */
    subjectIDs?: Array<number>;
    /**
     * Бренды
     * @type {Array<string>}
     * 
     */
    brandNames?: Array<string>;
    /**
     * Идентификаторы тегов
     * @type {Array<number>}
     * 
     */
    tagIDs?: Array<number>;
    /**
     * Начало периода
     * @type {string}
     * @example "2023-06-21"
     */
    startDate: string;
    /**
     * Конец периода
     * @type {string}
     * @example "2023-06-21"
     */
    endDate: string;
    /**
     * Временная зона, по умолчанию Europe/Moscow
     * @type {string}
     * 
     */
    timezone?: string;
    /**
     * Как сгруппировать данные (по умолчанию по дням):    * `day` — по дням   * `week` — по неделям   * `month` — по месяцам
     * @type {string}
     * 
     */
    "aggregationLevel": "day" | 'week' | 'month',
    /**
     * Скрыть удалённые номенклатуры
     * @type {boolean}
     * 
     */
    skipDeletedNm?: boolean;
}

type ParamsItemBrandOrTag = Omit<ParamsItemNmID, 'nmIDs'>
type JemReportRequestNmID = {
    /**
     * Идентификатор отчёта в UUID-формате. Генерируется продавцом самостоятельно
     * @type {string}
     * @memberof BySelectedNmIDReq
     */
    "id": uuid,
    /**
     * Тип отчёта — `DETAIL_HISTORY_REPORT`
     * @type {string}
     * @memberof BySelectedNmIDReq
     */
    "reportType": "DETAIL_HISTORY_REPORT",
    /**
     * Название отчёта (если не указано, сформируется автоматически)
     * @type {string}
     * @memberof BySelectedNmIDReq
     */
    "userReportName"?: string,
    "params": ParamsItemNmID
}
type JemReportRequestBandAndTag = JemReportRequestNmID &
    {
        "params": ParamsItemBrandOrTag,
        /**
         * Тип отчёта — `GROUPED_HISTORY_REPORT`
         * @type {string}
         * @memberof GroupedByObjectsBrandsAndTagsReq
         */
        "reportType": "GROUPED_HISTORY_REPORT"
    }
type ResponsePaidStorageInner =   {
    /**
     * Дата, за которую был расчёт или перерасчёт
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    date: string;
    /**
     * Коэффициент логистики и хранения
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    logWarehouseCoef: number;
    /**
     * ID склада
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    officeId: number;
    /**
     * Название склада
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    warehouse: string;
    /**
     * Коэффициент склада
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    warehouseCoef: number;
    /**
     * ID поставки
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    giId: number;
    /**
     * Идентификатор размера для этого артикула Wildberries
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    chrtId: number;
    /**
     * Размер (`techSize` в карточке товара)
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    size: string;
    /**
     * Баркод
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    barcode: string;
    /**
     * Предмет
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    subject: string;
    /**
     * Бренд
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    brand: string;
    /**
     * Артикул продавца
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    vendorCode: string;
    /**
     * Артикул Wildberries
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    nmId: number;
    /**
     * Объём товара
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    volume: number;
    /**
     * Способ расчёта
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    calcType: string;
    /**
     * Сумма хранения
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    warehousePrice: number;
    /**
     * Количество единиц товара (штук), подлежащих тарифицированию за расчётные сутки
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    barcodesCount: number;
    /**
     * Код паллетоместа
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    palletPlaceCode: number;
    /**
     * Количество паллет
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    palletCount: number;
    /**
     * Если был перерасчёт, это дата первоначального расчёта. Если перерасчёта не было, совпадает с `date`
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    originalDate: string;
    /**
     * Скидка программы лояльности, ₽
     * @type {number}
     * @memberof ResponsePaidStorageInner
     */
    loyaltyDiscount: number;
    /**
     * Дата фиксации тарифа
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    tariffFixDate: string;
    /**
     * Дата понижения тарифа
     * @type {string}
     * @memberof ResponsePaidStorageInner
     */
    tariffLowerDate: string;
}
type PaidAcceptedReport = {
    /**
     * Количество товаров, шт.
     * @type {number}
     * @memberof InlineResponse200Report
     */
    count: number;
    /**
     * Дата создания поставки
     * @type {string}
     * @memberof InlineResponse200Report
     */
    giCreateDate: string;
    /**
     * Номер поставки
     * @type {number}
     * @memberof InlineResponse200Report
     */
    incomeId: number;
    /**
     * Артикул Wildberries
     * @type {number}
     * @memberof InlineResponse200Report
     */
    nmID: number;
    /**
     * Дата приёмки
     * @type {string}
     * @memberof InlineResponse200Report
     */
    shkreateDate: string;
    /**
     * Предмет (подкатегория)
     * @type {string}
     * @memberof InlineResponse200Report
     */
    subjectName: string;
    /**
     * Суммарная стоимость приёмки, ₽
     * @type {number}
     * @memberof InlineResponse200Report
     */
    sum: number;
    /**
     * Суммарная стоимость приёмки, ₽ с копейками
     * @type {number}
     * @memberof InlineResponse200Report
     */
    total: number;
}

type CoefficentItem =   {
    "actualHeight":  number,
    "actualLength":  number,
    "actualVolume":  number,
    "actualWidth":  number,
    "date": string //Data format ГГГГ-ММ-ДД,
    "dimensionDifference":  number,
    "height":  number,
    "length":  number,
    "logWarehouseCoef":  number,
    "nmID":  number,
    "photoUrls":  Array<String>//url,
    "title": string,
    "volume":  number,
    "width":  number
}

export type NmReportDetailResponseData = {
    /**
     * Страница
     * @type {number}
     * @memberof NmReportDetailResponseData
     */
    page: number;
    /**
     * Есть ли следующая страница (false - нет, true - есть)
     * @type {boolean}
     * @memberof NmReportDetailResponseData
     */
    isNextPage: boolean;
    /**
     *
     * @type {Array<NmCardStatistic>}
     * @memberof NmReportDetailResponseData
     */
    cards: Array<NmCardStatistic>;
}
export type NmReportDetailHistoryRequest = {
    /**
     * Артикул Wildberries (максимум 20)
     * @type {Array<number>}
     * @memberof NmReportDetailHistoryRequest
     */
    nmIDs: Array<number>;
    /**
     *
     * @type {StaticPeriod}
     * @memberof NmReportDetailHistoryRequest
     */
    period: StaticPeriod;
    /**
     * Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow.
     * @type {string}
     * @memberof NmReportDetailHistoryRequest
     */
    timezone?: string;
    /**
     * Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням.
     * <br> Доступные уровни агрегации `day`, `week`
     * @type {string}
     * @memberof NmReportDetailHistoryRequest
     */
    "aggregationLevel"?: 'day' | 'week'
}
export type NmReportDetailHistoryResponseData = {
    /**
     * Артикул WB
     * @type {number}
     * @memberof NmReportDetailHistoryResponseData
     */
    nmID: number;
    /**
     * Наименование КТ
     * @type {string}
     * @memberof NmReportDetailHistoryResponseData
     */
    imtName: string;
    /**
     * Артикул продавца
     * @type {string}
     * @memberof NmReportDetailHistoryResponseData
     */
    vendorCode: string;
    /**
     *
     * @type {Array<NmReportDetailHistoryResponseHistory>}
     * @memberof NmReportDetailHistoryResponseData
     */
    history: Array<NmReportDetailHistoryResponseHistory>;
}
export type NmReportGroupedHistoryResponseData =  {
    /**
     *
     * @type {NmReportGroupedHistoryResponseObject}
     * @memberof NmReportGroupedHistoryResponseData
     */
    object: CardObject;
    /**
     * Название бренда
     * @type {string}
     * @memberof NmReportGroupedHistoryResponseData
     */
    brandName: string;
    /**
     *
     * @type {NmReportGroupedHistoryResponseTag}
     * @memberof NmReportGroupedHistoryResponseData
     */
    tag: Omit<Tag, 'color'>;
    /**
     *
     * @type {Array<NmReportGroupedHistoryResponseHistory>}
     * @memberof NmReportGroupedHistoryResponseData
     */
    history: Array<NmReportDetailHistoryResponseHistory>;
}
export type NmReportGetReportsResponseData= {
    /**
     * Идентификатор отчёта
     * @type {string}
     * @memberof NmReportGetReportsResponseData
     */
    id: string;
    /**
     * Дата и время завершения генерации
     * @example 2023-06-26 20:05:32
     * @type {Date}
     * @memberof NmReportGetReportsResponseData
     */
    createdAt: Date;
    /**
     * Статус отчёта:  * `WAITING` — в очереди на обработку * `PROCESSING` — генерируется * `SUCCESS —` готов * `RETRY` — ожидает повторной обработки * `FAILED` — не получилось сгенерировать, сгенерируйте повторно
     * @type {string}
     * @memberof NmReportGetReportsResponseData
     */
    status: StatusCreatingJemReport;
    /**
     * Название отчёта
     * @type {string}
     * @memberof NmReportGetReportsResponseData
     */
    name: string;
    /**
     * Размер отчёта, Б
     * @type {number}
     * @memberof NmReportGetReportsResponseData
     */
    size: number;
    /**
     * Начало периода
     * @example 2023-06-21
     * @type {string}
     * @memberof NmReportGetReportsResponseData
     */
    startDate: string;
    /**
     * Конец периода
     * @example 2023-06-21
     * @type {string}
     * @memberof NmReportGetReportsResponseData
     */
    endDate: string;
}
export type CreateTaskResponseData =  {
    /**
     * ID задания на генерацию
     * @type {string}
     * @memberof CreateTaskResponseData
     */
    taskId: string;
}
export type GetTasksResponseData = {
    /**
     * ID задания
     * @type {string}
     * @memberof GetTasksResponseData
     */
    id: string;
    /**
     * Статус задания:      * `new` — новое   * `processing` —  обрабатывается   * `done` — отчёт готов   * `purged` — отчёт удалён   * `canceled` — отклонено
     * @type {string}
     * @memberof GetTasksResponseData
     */
    status: StatusCratingStoragePaidReport;
}
export type ModelsExciseReportResponseDataInner ={
    /**
     * Страна покупателя
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    name: string;
    /**
     * Цена товара, с НДС
     * @type {number}
     * @memberof ModelsExciseReportResponseDataInner
     */
    price: number;
    /**
     * Валюта
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    currency_name_short: string;
    /**
     * Код маркировки
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    excise_short: string;
    /**
     * Баркод
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    barcode: string;
    /**
     * Артикул Wildberries
     * @type {number}
     * @memberof ModelsExciseReportResponseDataInner
     */
    nm_id: number;
    /**
     * Тип операции, если есть:    * `1` — вывод из оборота   * `2` — возврат в оборот
     * @type {number}
     * @memberof ModelsExciseReportResponseDataInner
     */
    operation_type_id: number;
    /**
     * Номер фискального документа (чека полного расчёта), если есть
     * @type {number}
     * @memberof ModelsExciseReportResponseDataInner
     */
    fiscal_doc_number: number;
    /**
     * Дата фискализации (дата в чеке), если есть, `ГГГГ-ММ-ДД`
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    fiscal_dt: string;
    /**
     * Номер фискального накопителя, если есть
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    fiscal_drive_number: string;
    /**
     * `Rid`
     * @type {number}
     * @memberof ModelsExciseReportResponseDataInner
     */
    rid: number;
    /**
     * `Srid`
     * @type {string}
     * @memberof ModelsExciseReportResponseDataInner
     */
    srid: string;
}
export type InlineResponse2001Details ={
    /**
     * Артикул Wildberries
     * @type {number}
     * @memberof InlineResponse2001Details
     */
    nmID: number;
    /**
     * Сумма заказа
     * @type {number}
     * @memberof InlineResponse2001Details
     */
    sum: number;
    /**
     * Валюта заказа
     * @type {string}
     * @memberof InlineResponse2001Details
     */
    currency: string;
    /**
     * Начало отчётного периода
     * @type {string}
     * @example 2023-08-23
     * @memberof InlineResponse2001Details
     */
    dateFrom: string;
    /**
     * Конец отчётного периода
     * @type {string}
     * @example 2023-08-23
     * @memberof InlineResponse2001Details
     */
    dateTo: string;
}
export type InlineResponse2002Report =  {
    /**
     * Цена, ₽
     * @type {number}
     * @memberof InlineResponse2002Report
     */
    amount: number;
    /**
     * Дата
     * @example  2023-12-01
     * @type {string}
     * @memberof InlineResponse2002Report
     */
    date: string;
    /**
     * Причина удержания
     * @type {string}
     * @memberof InlineResponse2002Report
     */
    lostReason: string;
    /**
     * Артикул Wildberries
     * @type {number}
     * @memberof InlineResponse2002Report
     */
    nmID: number;
    /**
     * Фото
     * @type {string}
     * @memberof InlineResponse2002Report
     */
    photoUrl: string;
    /**
     * Штрихкод
     * @type {number}
     * @memberof InlineResponse2002Report
     */
    shkID: number;
}
export type InlineResponse2004Report = {
    /**
     * Сумма штрафа, руб
     * @type {number}
     * @memberof InlineResponse2004Report
     */
    amount: number;
    /**
     * Дата
     * @example  yyyy-mm-dd
     * @type {Date}
     * @memberof InlineResponse2004Report
     */
    date: Date;
    /**
     * Номер поставки
     * @type {number}
     * @memberof InlineResponse2004Report
     */
    incomeId: number;
    /**
     * Артикул WB
     * @type {number}
     * @memberof InlineResponse2004Report
     */
    nmID: number;
    /**
     * URL фото товара
     * @type {Array<string>}
     * @memberof InlineResponse2004Report
     */
    photoUrls: Array<string>;
    /**
     * Штрихкод товара в Wildberries
     * @type {number}
     * @memberof InlineResponse2004Report
     */
    shkID: number;
    /**
     * Баркод из карточки товара
     * @type {string}
     * @memberof InlineResponse2004Report
     */
    sku: string;
}
export interface InlineResponse2005Report {
    /**
     * Сумма штрафа в копейках
     * @type {number}
     * @memberof InlineResponse2005Report
     */
    amount: number;
    /**
     * Дата изменения характеристик товара на складе
     * @example 2024-03-01T01:00:00Z
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    date: string;
    /**
     * Новый баркод в карточке товара
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    newBarcode: string;
    /**
     * Новый цвет
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    newColor: string;
    /**
     * Новый артикул продавца
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    newSa: string;
    /**
     * Новый штрихкод товара в Wildberries
     * @type {number}
     * @memberof InlineResponse2005Report
     */
    newShkID: number;
    /**
     * Новый размер
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    newSize: string;
    /**
     * Артикул WB
     * @type {number}
     * @memberof InlineResponse2005Report
     */
    nmID: number;
    /**
     * Старый баркод из карточки товара
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    oldBarcode: string;
    /**
     * Старый цвет
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    oldColor: string;
    /**
     * Старый артикул продавца
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    oldSa: string;
    /**
     * Старый штрихкод товара в Wildberries
     * @type {number}
     * @memberof InlineResponse2005Report
     */
    oldShkID: number;
    /**
     * Старый размер
     * @type {string}
     * @memberof InlineResponse2005Report
     */
    oldSize: string;
}
interface WbAnalystInterface {
    nmReportGroupedPost(queryData: ShameRequestStaticCard): Promise<WbResponse & NmReportDetailResponseData | undefined>,
    nmReportGroupedTagBrandPost(queryData: Omit<ShameRequestStaticCard, 'nmIDs'>): Promise<WbResponse & NmReportDetailResponseData | undefined>,
    nmReportDayGroupedPost(queryData: NmReportDetailHistoryRequest): Promise<WbResponse & { data: Array<NmReportDetailHistoryResponseData> } |undefined>,
    nmReportDayGroupedTagBrandPost(queryData: Omit<ShameRequestStaticCard, 'orderBy' | 'page'> & { aggregationLevel?: 'day' | 'week' }): Promise<WbResponse & { data: Array<NmReportGroupedHistoryResponseData> }|undefined>
    nmReportJemCretePost(queryData: JemReportRequestNmID | JemReportRequestBandAndTag): Promise<WbResponse | undefined>
    nmReportJemListGet(queryParams: { filter?: Array<uuid> }): Promise<WbResponse & { data: Array<NmReportGetReportsResponseData> } | undefined>
    nmReportJemRepeatPost(queryData: { downloadId: uuid }): Promise<WbResponse|undefined>
    nmReportJemReportGet(queryParams: { downloadId: uuid }): Promise<BinaryData|undefined>

    analyticsOutputMustMarkPost(queryData: { countries?: Array<string> }, queryParams: PeriodFromTo): Promise<{
        "response": {
            "data": Array<ModelsExciseReportResponseDataInner
            >
        }
    }|undefined>

    paidStorageCrateTaskReportGet(queryParams: PeriodFromTo): Promise<{ "data": CreateTaskResponseData } | undefined>
    paidStorageCheckStatusTaskGet(queryParams: { task_id: string }): Promise<{ "data": GetTasksResponseData }|undefined>
    paidStorageReportGet(queryParams: CreateTaskResponseData):Promise<Array<ResponsePaidStorageInner>|undefined>
    paidAcceptedReportGet(queryParams: PeriodFromTo):Promise<{
        "report":Array<PaidAcceptedReport>
    }|undefined>
    analyseAntifraudDetailsReportGet(queryParams:{ date?:string }):Promise<{ details:Array<InlineResponse2001Details> }|undefined>
    analyseIncorrectAttachmentsReportGet(queryParams:PeriodFromToData):Promise<Array<InlineResponse2002Report>|undefined>
    analyseCoefficientStorageGet(queryParams?:{date?:string}):Promise<{report:CoefficentItem}|undefined>
    // getCoefficientStorageAND_Logistic(queryParams:{
    //     //Example: date=2023-12-01
    //     date?:String
    // }):Promise<CoefficentItem|undefined>

    analyseFineIncorrectMarkingReportGet(queryParams:PeriodFromToData):Promise<{ report:Array<InlineResponse2004Report> }|undefined>
    analyseAntifraudForChangePropertyOutputReportGet(queryParams:PeriodFromToData):Promise<{
        report:Array<InlineResponse2005Report>
    }>
}

export default class WbAnalyst extends WbBaseAPI implements WbAnalystInterface {
    wildberriesRU_URL = 'https://seller-analytics-api.wildberries.ru/api'
    protected listAPI = {
        //analyse seller

        //Sales funnel
        cardStatisticPeriod: "/v2/nm-report/detail",
        cardStatisticPeriodGroped: '/v2/nm-report/grouped',
        cardStatisticOnDayNomenclatureID: '/v2/nm-report/detail/history',
        cardStatisticOnDayGroped: '/v2/nm-report/grouped/history',

        //Sales funnel
        jemCreateReport: '/v2/nm-report/downloads',
        jemGetListReport: '/v2/nm-report/downloads',
        jemCreateRepeatReport: '/v2/nm-report/downloads/retry',
        jemGetReport: (downloadId:string)=>'/v2/nm-report/downloads/file/'+downloadId,//{downloadId}

        //reports

        // Товары с обязательной маркировкой
        reportCardMustMarker: '/v1/analytics/excise-report',

        //paid storage
        storageCreateReport: '/v1/paid_storage',
        storageGetStatus: (task_id: string) => `/v1/paid_storage/tasks/${task_id}/status`,
        storageGetReport: (task_id: string) => `/v1/paid_storage/tasks/${task_id}/download`,

        //paid of accepting
        acceptedReport: '/v1/analytics/acceptance-report',

        //report on antifraud
        antifraudGetReport: '/v1/analytics/antifraud-details',
        antifraudIncorrectSendReport: '/v1/analytics/incorrect-attachments',
        storageCoefficientReport: "/v1/analytics/storage-coefficient",
        fineForIncorrectMarkingReport: '/v1/analytics/goods-labeling',
        antifraudForChangePropertyOutput: '/v1/analytics/characteristics-change'
    }
 

    /**
     * @description Получение статистики КТ за выбранный период, по nmID/предметам/брендам/тегам.
     *@description Поля brandNames,objectIDs, tagIDs, nmIDs могут быть пустыми,
     * тогда в ответе идут все карточки продавца.
     * @description  Можно получить отчёт максимум за последний год (365 дней).
     * @description limit require - 3 in 1 min
     * @see WbResponse
     * @throws {WbError}
     * @async
     */
    async  nmReportGroupedPost(queryData: Omit<ShameRequestStaticCard, "nmIDs">):
        Promise<(WbResponse &
        NmReportDetailResponseData) | undefined> {
        return this.postFetch(this.wildberriesRU_URL+this.listAPI.cardStatisticPeriod,queryData)
    }

    /**
     *@description Получение статистики КТ за период, сгруппированный по предметам, брендам и тегам.
     * @description Поля brandNames, objectIDs, tagIDs могут быть пустыми,
     * тогда группировка происходит по всем карточкам продавца.
     * @description Можно получить отчёт максимум за последний год (365 дней).
     * @description if  previousPeriod < 1 years lade -> previousPeriod.start = текущая дата - 365 дней.
     * @description limit 3 in 1min
     * @param {ShameRequestStaticCard} queryData
     * @see WbResponse
     * @throws {WbError}
     * @async
     */
    async nmReportGroupedTagBrandPost(queryData: ShameRequestStaticCard): Promise<(WbResponse &
        NmReportDetailResponseData) | undefined> {
        return  this.postFetch(this.wildberriesRU_URL+this.listAPI.cardStatisticPeriodGroped,queryData)
    }

    /**
     * @description Получение статистики КТ по дням по выбранным nmID.
     * @description Можно получить отчёт максимум за последнюю неделю
     * @description limit 3 in 1min
     * @see WbResponse
     * @throws {WbError}
     * @param queryData
     */

    async nmReportDayGroupedPost(queryData: NmReportDetailHistoryRequest): Promise<WbResponse & { data: Array<NmReportDetailHistoryResponseData> } |undefined>{
        return this.postFetch(this.wildberriesRU_URL+this.listAPI.cardStatisticOnDayNomenclatureID,queryData)

    }

    /**
     * @description Получение статистики КТ по дням за период, сгруппированный по предметам, брендам и тегам.
     * @description Можно получить отчёт максимум за последнюю неделю.
     * @description с подпиской Джем до 1 года.
     * @description sum lens (brandNames, objectIDs, tagIDs) max 16. Maybe zero
     * @description limit 3 in 1 min
     * @throws {WbError}
     * @see ShameRequestStaticCard
     * @see WbResponse
     * @param queryData
     * @async
     */
    async nmReportDayGroupedTagBrandPost(queryData: Omit<ShameRequestStaticCard, 'orderBy' | 'page'> & { aggregationLevel?: 'day' | 'week' }): Promise<WbResponse & { data: Array<NmReportGroupedHistoryResponseData> }|undefined>{
        return this.postFetch(this.wildberriesRU_URL+this.listAPI.cardStatisticOnDayGroped,queryData)

    }

    /**
     * @description Вы можете создать отчёт с группировкой:
     * @description -- по артикулам Wildberries (nmID);
     * @description -- по категориям, брендам и тегам.
     * @description В каждом из этих отчётов можно сгруппировать данные по дням, неделям или месяцам.
     * @description limit 3 in 1min
     * @description max 20 in day
     * @throws {WbError}
     * @see WbResponse
     * @param queryData
     * @async
     */
    async nmReportJemCretePost(queryData: JemReportRequestNmID | JemReportRequestBandAndTag): Promise<WbResponse | undefined> {
        return this.postFetch(this.wildberriesRU_URL+this.listAPI.jemCreateReport,queryData)

    }

    /**
     * @description max 3 in 1min
     * @see WbResponse
     * @throws {WbError}
     * @param queryParams
     * @async
     */
    async nmReportJemListGet(queryParams?: { filter?: Array<uuid> }): Promise<WbResponse & {
        data: Array<NmReportGetReportsResponseData>
    } | undefined>{
        let url  = new URL(this.wildberriesRU_URL+this.listAPI.jemGetListReport)
        for (const urlElement of Object.entries(queryParams ?? {})) {
            if(urlElement[1]){
                urlElement[1].forEach(el=>url.searchParams.append(urlElement[0],el))
            }
        }
        return this.getFetch(url.toString() )

    }

    /**
     * @description limit 3 in 1 min
     * @throws {WbError}
     * @param queryData
     * @async
     */
    async nmReportJemRepeatPost(queryData: { downloadId: uuid }): Promise<WbResponse|undefined> {
        return this.postFetch(this.wildberriesRU_URL+this.listAPI.jemCreateRepeatReport,queryData)

    }

    /**
     * @description Можно получить отчёт, который сгенерирован в последние 48 часов.
     * @description limit 3 in 1 min
     * @description Отчет будет загружен внутри архива ZIP в формате CSV.
     * @throws {WbError}
     * @param queryParams
     */
    async nmReportJemReportGet(queryParams: { downloadId: uuid }): Promise<BinaryData|undefined> {
        return fetch(new URL(this.wildberriesRU_URL+this.listAPI.jemGetReport(queryParams.downloadId).toString()).toString(),{
            method:'GET',
            headers:{
                Authorization:`${this.token}`,
                'Content-Type':'text/csv'
            }
        }).then()
    }


    /**
     * @description Возвращает операции по маркируемым товарам.
     * @description limit Максимум 10 запросов за 5 часов.
     * @see PeriodFromTo
     * @throws {WbError & {status:400,errorData:string}}
     * @param queryData
     * @param queryParams
     */
    async analyticsOutputMustMarkPost(queryData: { countries?: Array<string> }, queryParams: PeriodFromTo): Promise<{
        response: { data: Array<ModelsExciseReportResponseDataInner> } }| undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.reportCardMustMarker)
        for (const urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return  this.postFetch(url.toString(),queryData)

    }

    /**
     * @description Создаёт задание на генерацию отчёта.
     * @description limit максимум за 8 дней
     * @description limit 1 in 1 min
     * @throws {WbErrorRaid}
     * @async
     * @param queryParams
     */
    async paidStorageCrateTaskReportGet(queryParams: PeriodFromTo): Promise<{ data: CreateTaskResponseData } | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.storageCreateReport)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return  this.getFetch(url.toString())

    }

    /**
     *@description Возвращает статус задания на генерацию
     * @description limit 1 in 5sec
     * @throws {WbError & {status:400,errorData:string}}
     * @async
     * @param queryParams
     */
    async paidStorageCheckStatusTaskGet(queryParams: { task_id: string }): Promise<{ data: GetTasksResponseData } | undefined> {
        return  this.getFetch(this.wildberriesRU_URL+this.listAPI.storageGetStatus(queryParams.task_id))
    }


    /**
     * @description Возвращает отчёт по ID задания
     * @description limit 1 in 1min
     * @throws {WbError & {status:400,errorData:string}}
     * @async
     * @param queryParams
     */
    async paidStorageReportGet(queryParams: CreateTaskResponseData): Promise<Array<ResponsePaidStorageInner>|undefined> {
        return this.getFetch( this.wildberriesRU_URL+this.listAPI.storageGetReport(queryParams.taskId))
    }

    /**@description Возвращает даты и стоимость приёмки
     * @description максимум за 31 день
     * @description limit 1 in 1min
     * @throws {WbErrorWithTitle | WbErrorWith500}
     * @async
     */
    async paidAcceptedReportGet(queryParams: PeriodFromToData): Promise<{ report: Array<PaidAcceptedReport> } | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.acceptedReport)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return this.getFetch(url.toString())

    }

    /**
     *@description Возвращает отчёт по удержаниям за самовыкупы.
     * @description Отчёт формируется каждую неделю по средам, до 7:00 по московскому времени
     * @description Также можно получить отчёт за всё время с августа 2023.
     * @description Удержание за самовыкуп — это 30% от стоимости товаров
     * @description  Минимальная сумма всех удержаний — 100 000 ₽, если за неделю в ПВЗ привезли больше ваших товаров, чем на 100 000 ₽.
     * @description limit 10 in 100 min.
     * @param queryParams
     * @throws {WbErrorRaid}
     * @example
     *  date=2023-12-01
     * @async
     */
    async analyseAntifraudDetailsReportGet(queryParams?: { date?: string }): Promise<{ details: Array<InlineResponse2001Details> } | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.antifraudGetReport)
        for (let urlElement of Object.entries(queryParams ?? {})) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return  this.getFetch(url.toString())

    }

    /**
     * @description Возвращает отчёт об удержаниях за отправку не тех товаров,
     * пустых коробок или коробок без товара, но с посторонними предметами.
     * @description В таких случаях удерживается 100% от стоимости заказа.
     * @description Можно получить отчёт максимум за 31 день, доступны данные с июня 2023.
     * @description limit 1 in 1min
     * @throws {WbErrorWithTitle}
     * @param queryParams
     * @async
     */
    async analyseIncorrectAttachmentsReportGet(queryParams:PeriodFromToData): Promise<Array<InlineResponse2002Report> | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.antifraudIncorrectSendReport)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return this.getFetch(url.toString())

    }

    /**
     *@description Возвращает коэффициенты логистики и хранения.
     * @see https://openapi.wb.ru/analytics/api/ru/#tag/Otchyoty-po-uderzhaniyam/paths/~1api~1v1~1analytics~1storage-coefficient/get
     * @description limin 1 in 1min
     * @param queryParams
     * @throws {WbErrorRaid|WbErrorWith500}
     * @example
     *  date=2023-12-01
     */
    async analyseCoefficientStorageGet(queryParams?: {date?:string}): Promise<{ report: CoefficentItem } | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.storageCoefficientReport)
        for (let urlElement of Object.entries(queryParams??{})) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return this.getFetch(url.toString())

    }

    /**
     * @description Возвращает отчёт о штрафах за отсутствие обязательной маркировки товаров
     * @description Можно получить данные максимум за 31 день, начиная с марта 2024
     * @description limit 10 in 10 min
     * @throws {WbErrorWithTitle}
     * @async
     * @param queryParams
     *@example
     * {
     * "report": [
     *      {
     *          "amount": 1500,
     *          "date": "2024-03-26T01:00:00Z",
     *          "incomeId": 18484008,
     *          "nmID": 49434732,
     *          "photoUrls": [],
     *          "shkID": 17346434621,
     *          "sku": "4630153500834"
     *       }
     *     ]
     * }

     */
    async analyseFineIncorrectMarkingReportGet(queryParams: PeriodFromToData): Promise<{ report:Array<InlineResponse2004Report> } | undefined> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.fineForIncorrectMarkingReport)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return this.getFetch(url.toString())

    }

    /**
     * @description Возвращает отчёт об удержаниях за смену характеристик товара.
     * @description Если товары после приёмки не соответствуют заявленным цветам и
     * размерам, и на складе их перемаркировали с правильными характеристиками,
     * по таким товарам назначается штраф.
     * @description Можно получить отчёт максимум за 31 день
     * @description доступны данные с 28 декабря 2021.
     * @description limit 10 in 10min
     * @throws {WbErrorWithTitle}
     * @async
     * @param queryParams
     */
    async analyseAntifraudForChangePropertyOutputReportGet(queryParams: PeriodFromToData): Promise<{
        report:Array<InlineResponse2005Report>
    }> {
        let url = new URL(this.wildberriesRU_URL+this.listAPI.antifraudForChangePropertyOutput)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return  this.getFetch(url.toString())
    }
}