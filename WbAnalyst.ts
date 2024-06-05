import {WbBaseAPI} from "./WbBaseAPI";
import {WbResponse} from "./WbType";
import {Tag} from "./WbContact";
import {WbError} from "./WbError";

enum FiendSort {
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
    WAITING = 'WAITING', // — в очереди на обработку
    PROCESSING = 'PROCESSING', // — генерируется
    SUCCESS = 'SUCCESS', //— готов
    RETRY = 'RETRY',// — ожидает повторной обработки
    FAILED = 'FAILED'//не получилось сгенерировать
}

enum StatusCratingStoragePaidReport {
    new = 'new', // — новое
    processing = "processing",// — обрабатывается
    done = "done", // — отчёт готов
    purged = "purged", //— отчёт удалён
    canceled = 'canceled' //— отклонено
}

type ShameRequestStaticCard = {
    "brandNames"?: Array<String>,
    "objectIDs"?: Array<Number>,
    "tagIDs"?: Array<Number>,
    "nmIDs"?: Array<Number>,
    "timezone": String,//https://nodatime.org/TimeZones
    "period": {
        "begin": String,//Data Format 2023-06-01 20:05:32
        "end": String //Data Format
    },
    "orderBy": {
        "field": FiendSort,
        "mode": String
    },
    "page": Number
}
type CardObject = {
    "id": Number,
    "name": String
}
type StaticPeriod = {
    "begin": String,//Data
    "end": String,//Data
}
type Statistics = {
    "openCardDynamics": Number,
    "addToCartDynamics": Number,
    "ordersCountDynamics": Number,
    "ordersSumRubDynamics": Number,
    "buyoutsCountDynamics": Number,
    "buyoutsSumRubDynamics": Number,
    "cancelCountDynamics": Number,
    "cancelSumRubDynamics": Number,
    "avgOrdersCountPerDayDynamics": Number,
    "avgPriceRubDynamics": Number,
    "conversions": {
        "addToCartPercent": Number,
        "cartToOrderPercent": Number,
        "buyoutsPercent": Number
    }
}
type StatisticsPeriod = Statistics & StaticPeriod
type CardStatistic = {
    "nmID": 1234567,
    "vendorCode": "supplierVendor",
    "brandName": "Some",
    "tags": Array<Omit<Tag, 'color'>>,
    "object": CardObject,
    "statistics": {
        "selectedPeriod": StatisticsPeriod,
        "previousPeriod": StatisticsPeriod,
        "periodComparison": Statistics
    },
    "stocks": {
        "stocksMp": Number,
        "stocksWb": Number
    }
}
type uuid = string
type HistoryNomenclatureStatisItem = {
    "dt": string,//Data
    "openCardCount": Number,
    "addToCartCount": Number,
    "ordersCount": Number,
    "ordersSumRub": Number,
    "buyoutsCount": Number,
    "buyoutsSumRub": Number,
    "buyoutPercent": Number,
    "addToCartConversion": Number,
    "cartToOrderConversion": Number
}
type ParamsItemNmID = {
    "nmIDs"?: Array<Number>,
    "subjectIDs"?: Array<Number>,
    "brandNames"?: Array<String>,
    "tagIDs"?: Array<Number>,
    "startDate": String,//Data
    "endDate": String,//Data
    "timezone": String,
    "aggregationLevel": "day" | 'week' | 'month',
    "skipDeletedNm": Boolean
}
type ParamsitemBrandOrTag = Omit<ParamsItemNmID, 'nmIDs'>
type JemReportRequestNmID = {
    "id": uuid,
    "reportType": " DETAIL_HISTORY_REPORT",
    "userReportName"?: "Subject report",
    "params": ParamsItemNmID
}
type JemReportRequestBandAndTag = JemReportRequestNmID &
    {
        "params": ParamsitemBrandOrTag,
        "reportType": "GROUPED_HISTORY_REPORT"
    }
type PaidStorageReport =   {
    "date": String,//Data
    "logWarehouseCoef": Number,
    "officeId": Number,
    "warehouse": String,
    "warehouseCoef": String,
    "giId": String,
    "chrtId": Number,
    "size": String,
    "barcode": String,
    "subject": String,
    "brand": String,
    "vendorCode": String,
    "nmId": Number,
    "volume": Number,
    "calcType": String,
    "warehousePrice": Number,
    "barcodesCount": Number,
    "palletPlaceCode": Number,
    "palletCount": Number,
    "originalDate": String,//Data
    "loyaltyDiscount": Number,
    "tariffFixDate": String,//Data
    "tariffLowerDate": String,//Data
}
type PaidAcceptedReport = {
    "count": Number,
    "giCreateDate": String,//Data
    "incomeId": Number,
    "nmID": Number,
    "shkСreateDate": String,//Data
    "subjectName": String,
    "sum": Number,
    "total": Number
}
type PaidAcceptedError400 = {
    "title": String,
    "detail": String,
    "requestId": String,
    "origin":String
}
type CoefficentItem =   {
    "actualHeight": Number,
    "actualLength": Number,
    "actualVolume": Number,
    "actualWidth": Number,
    "date": String //Data format ГГГГ-ММ-ДД,
    "dimensionDifference": Number,
    "height": Number,
    "length": Number,
    "logWarehouseCoef": Number,
    "nmID": Number,
    "photoUrls":  Array<String>//url,
    "title": String,
    "volume": Number,
    "width": Number
}
interface WbAnalystInterface {
    postGetStatsPeriod(queryData: ShameRequestStaticCard): Promise<WbResponse &
        {
            page: Number,
            isNextPage: Boolean,
            cards: Array<CardStatistic>
        }
        | undefined>,

    postGetStatsPeriodGroup(queryData: Omit<ShameRequestStaticCard, 'nmIDs'>): Promise<WbResponse &
        {
            page: Number,
            isNextPage: Boolean,
            cards: Array<CardStatistic>
        }
        | undefined>,

    postGetStatsDay(queryData: {
        "nmIDs": Array<Number>,
        "period": StaticPeriod,
        "timezone"?: String,//https://nodatime.org/TimeZones
        "aggregationLevel"?: 'day' | 'week'
    }): Promise<WbResponse & {
        data: Array<{
            "nmID": 1234567,
            "imtName": "Наименование КТ",
            "vendorCode": "supplierVendor",
            "history": HistoryNomenclatureStatisItem
        }>
    }>

    postGetStatsDatGroup(queryData: Omit<ShameRequestStaticCard, 'orderBy' | 'page'> &
        { aggregationLevel?: 'day' | 'week' }): Promise<WbResponse &
        {
            data: Array<{
                object: CardObject,
                brandName: String,
                tag: Omit<Tag, 'color'>,
                history: HistoryNomenclatureStatisItem
            }>
        }>

    postJemCreteReport(queryData: JemReportRequestNmID | JemReportRequestBandAndTag): Promise<WbResponse | undefined>

    getJemListReport(queryParams: { filter: Array<uuid> }): Promise<WbResponse & {
        data: Array<{
            "id": uuid,
            "createdAt": String,//Data
            "status": StatusCreatingJemReport,
            "name": String,
            "size": Number,
            "startDate": String,//Data
            "endDate": String //Data
        }>
    } | undefined>

    postJemRepeatCreateReport(queryData: { downloadId: uuid }): Promise<WbResponse>

    getJemReport(queryParams: { downloadId: uuid }): BinaryData,

    postOutputMustMark(queryData: { countries?: Array<string> }, queryParams: {
        //data format RFC3339
        dateFrom: String,
        //data format RFC3339
        dateTo: String
    }): Promise<{
        "response": {
            "data": Array<
                {
                    "name": String,
                    "price": Number,
                    "currency_name_short": String,
                    "excise_short": String,
                    "barcode": Number,
                    "nm_id": Number,
                    "operation_type_id": Number,
                    "fiscal_doc_number": Number,
                    "fiscal_dt": String, //Data
                    "fiscal_drive_number": String,
                    "rid": Number,
                    "srid": String
                }
            >
        }
    }>

    getStartTaskCratePaidStorageReport(queryParams: {
        //Data RFC3339 2019-06-20 or 2019-06-20T23:59:59
        dateFrom: String,
        //Data RFC3339 2019-06-20 or 2019-06-20T23:59:59
        dateTo: String
    }): Promise<{
        "data": {
            "taskId": String
        }
    } | undefined>

    getCheckStatusTaskPaidStorageReport(queryParams: { task_id: String }): Promise<{
        "data": {
            "id": String,
            "status":StatusCratingStoragePaidReport

        }
    }|undefined>

    getPaidStorageReport(queryParams: { task_id: String }):Promise<Array<PaidStorageReport>>

    /**
     * @description Promise.reject  <WbError|PaidAcceptedError400>
     * @param queryParams
     */
    getPaidAcceptedReport(queryParams: {
        //Data RFC3339 2019-06-20 or 2019-06-20T23:59:59
        dateFrom: String,
        //Data RFC3339 2019-06-20 or 2019-06-20T23:59:59
        dateTo: String
    }):Promise<{
        "report":Array<PaidStorageReport>
    }|undefined>

    getAntifraudReport(queryParams:{
        //Example: date=2023-12-01
        date?:String
    }):Promise<{
      details:Array<{
          "nmID": Number,
          "sum": Number,
          "currency": String,
          "dateFrom": String,//Data
          "dateTo": String,Data
      }>
    }|undefined>

    /**
     * @description Promise.reject({
     *   "title": String,
     *   "detail": String,
     *   "requestId": String,
     *   "origin": String
     * })
     * @param queryParams
     */
    getIncorrectAttachmentsReport(queryParams:{
        //Example: date=2023-12-01
        dateFrom:String,
        //Example: date=2023-12-01
        dateTo:String
    }):Promise<Array<
        {
            "amount": Number,
            "date": String,//Example: date=2023-12-01
            "lostReason": String,
            "nmID": Number,
            "photoUrl": String,//url
            "shkID": 14555724540
        }>|undefined>

    getCoefficientStorage(queryParams:{
        //Example: date=2023-12-01
        dateFrom:String,
        //Example: date=2023-12-01
        dateTo:String
    }):Promise<{report:CoefficentItem}|undefined>
    getCoefficientStorageAND_Logistic(queryParams:{
        //Example: date=2023-12-01
        date?:String
    }):Promise<CoefficentItem|undefined>

    /**
     * @description if error return type Promise.reject<PaidAcceptedError400>
     * @param queryParams
     */
    getFineIncorrectMarkingReport(queryParams:{
        //Example: date=2023-12-01
        dateFrom:String,
        //Example: date=2023-12-01
        dateTo:String
    }):Promise<{
        report:{
            "amount": Number,
            "date":String,//Data yyyy-mm-dd
            "incomeId": Number,
            "nmID": Number,
            "photoUrls": Array<String>,
            "shkID": Number,
            "sku": String
        }
    }|undefined>
    /**
     * @description if error return type Promise.reject<PaidAcceptedError400>
     * @param queryParams
     */
    getAntifraudForChangePropertyOutputReport(queryParams:{
        //Example: date=2023-12-01
        dateFrom:String,
        //Example: date=2023-12-01
        dateTo:String
    }):Promise<{
        report:{
            "amount": Number,
            "date":String,//Data
            "newBarcode": String,
            "newColor": String,
            "newSa": String,
            "newShkID": Number,
            "newSize": String,
            "nmID": Number,
            "oldBarcode": String,
            "oldColor": String,
            "oldSa": String,
            "oldShkID": Number,
            "oldSize": String
        }
    }>
}

class WbAnalyst extends WbBaseAPI {
    protected additionURL = "/api";

    protected listAPI = {
        //analyse seller

        //Sales funnel
        cardStatisticPeriod: "/v2/nm-report/detail",
        cardStatisticPeriodGroped: '/v2/nm-report/grouped',
        cardStatisticOnDayNomenclatureID: 'v2/nm-report/detail/history',
        cardStatisticOnDayGroped: '/v2/nm-report/grouped/history',

        //Sales funnel
        jemCreateReport: '/v2/nm-report/downloads',
        jemGetListReport: '/v2/nm-report/downloads',
        jemCreateRepeatReport: '/v2/nm-report/downloads/retry',
        jemGetReport: '/v2/nm-report/downloads/file/',//{downloadId}

        //reports

        // Товары с обязательной маркировкой
        reportCardMustMarker: '/v1/analytics/excise-report',

        //paid storage
        storageCreateReport: '/v1/paid_storage',
        storageGetStatus: (task_id: Number) => `/v1/paid_storage/tasks/${task_id}/status`,
        storageGetReport: (task_id: Number) => `/v1/paid_storage/tasks/${task_id}/download`,

        //paid of accepting
        acceptedReport: '/v1/analytics/acceptance-report',

        //report on antifraud
        antifraudGetReport: '/v1/analytics/antifraud-details',
        antifraudIncorrectSendReport: '/v1/analytics/incorrect-attachments',
        storageCoefficientReport: "/v1/analytics/storage-coefficient",
        fineForIncorrectMarkingReport: '/v1/analytics/goods-labeling',
        antifraudForChangePropertyOutput: '/v1/analytics/characteristics-change'
    }

}
