import {WbBaseAPI} from "./WbBaseAPI";
import {WbResponse} from "./WbType";
import {Tag} from "./WbContact";
import {WbError, WbErrorData} from "./WbError";

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


type ShameRequestStaticCard =
    {
    "brandNames"?: Array<String>,
    "objectIDs"?: Array< number>,
    "tagIDs"?: Array< number>,
    "nmIDs"?: Array< number>,
    "timezone"?: string,//https://nodatime.org/TimeZones
    "period": StaticPeriod,
    "orderBy"?: {
        "field": FiendSort,
        "mode": string
    },
    "page":  number
}
type CardObject = {
    "id":  number,
    "name": string
}
/**
 * @param begin - Data format yy-mm-dd
 * @param end - Data format yy-mm-dd
 */
type StaticPeriod = {
    "begin": string,//Data
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
}/**
 *
 * @description data format RFC3339
 * @example
 * 2023-12-01
 *
 */
type PeriodFromToData = PeriodFromTo
type Statistics = {
    "openCardDynamics":  number,
    "addToCartDynamics":  number,
    "ordersCountDynamics":  number,
    "ordersSumRubDynamics":  number,
    "buyoutsCountDynamics":  number,
    "buyoutsSumRubDynamics":  number,
    "cancelCountDynamics":  number,
    "cancelSumRubDynamics":  number,
    "avgOrdersCountPerDayDynamics":  number,
    "avgPriceRubDynamics":  number,
    "conversions": {
        "addToCartPercent":  number,
        "cartToOrderPercent":  number,
        "buyoutsPercent":  number
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
        "stocksMp":  number,
        "stocksWb":  number
    }
}
type uuid = string
type HistoryNomenclatureStatisItem = {
    "dt": string,//Data
    "openCardCount":  number,
    "addToCartCount":  number,
    "ordersCount":  number,
    "ordersSumRub":  number,
    "buyoutsCount":  number,
    "buyoutsSumRub":  number,
    "buyoutPercent":  number,
    "addToCartConversion":  number,
    "cartToOrderConversion":  number
}
type ParamsItemNmID = {
    "nmIDs"?: Array< number>,
    "subjectIDs"?: Array< number>,
    "brandNames"?: Array<String>,
    "tagIDs"?: Array< number>,
    "startDate": string,//Data
    "endDate": string,//Data
    "timezone": string,
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
    "date": string,//Data
    "logWarehouseCoef":  number,
    "officeId":  number,
    "warehouse": string,
    "warehouseCoef": string,
    "giId": string,
    "chrtId":  number,
    "size": string,
    "barcode": string,
    "subject": string,
    "brand": string,
    "vendorCode": string,
    "nmId":  number,
    "volume":  number,
    "calcType": string,
    "warehousePrice":  number,
    "barcodesCount":  number,
    "palletPlaceCode":  number,
    "palletCount":  number,
    "originalDate": string,//Data
    "loyaltyDiscount":  number,
    "tariffFixDate": string,//Data
    "tariffLowerDate": string,//Data
}
type PaidAcceptedReport = {
    "count":  number,
    "giCreateDate": string,//Data
    "incomeId":  number,
    "nmID":  number,
    "shkСreateDate": string,//Data
    "subjectName": string,
    "sum":  number,
    "total":  number
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
interface WbAnalystInterface {
    postGetStatsPeriod(queryData: ShameRequestStaticCard): Promise<WbResponse &
        {
            page:  number,
            isNextPage: Boolean,
            cards: Array<CardStatistic>
        }
        | undefined>,

    postGetStatsPeriodGroup(queryData: Omit<ShameRequestStaticCard, 'nmIDs'>): Promise<WbResponse &
        {
            page:  number,
            isNextPage: Boolean,
            cards: Array<CardStatistic>
        }
        | undefined>,

    postGetStatsDay(queryData: {
        "nmIDs": Array< number>,
        "period": StaticPeriod,
        "timezone"?: string,//https://nodatime.org/TimeZones
        "aggregationLevel"?: 'day' | 'week'
    }): Promise<WbResponse & {
        data: Array<{
            nmID: number;
            imtName: string;
            vendorCode: string;
            history: HistoryNomenclatureStatisItem
        }>
    } |undefined>

    postGetStatsDayGroup(queryData: Omit<ShameRequestStaticCard, 'orderBy' | 'page'> &
        { aggregationLevel?: 'day' | 'week' }): Promise<WbResponse &
        {
            data: Array<{
                object: CardObject,
                brandName: string,
                tag: Omit<Tag, 'color'>,
                history: HistoryNomenclatureStatisItem
            }>
        }|undefined>

    postJemCreteReport(queryData: JemReportRequestNmID | JemReportRequestBandAndTag): Promise<WbResponse | undefined>

    getJemListReport(queryParams: { filter?: Array<uuid> }): Promise<WbResponse & {
        data: Array<{
            "id": uuid,
            "createdAt": string,//Data
            "status": StatusCreatingJemReport,
            "name": string,
            "size":  number,
            "startDate": string,//Data
            "endDate": string //Data
        }>
    } | undefined>

    postJemRepeatCreateReport(queryData: { downloadId: uuid }): Promise<WbResponse|undefined>

    getJemReport(queryParams: { downloadId: uuid }): Promise<BinaryData|undefined>,

    postOutputMustMark(queryData: { countries?: Array<string> }, queryParams: PeriodFromTo):
        Promise<{
        "response": {
            "data": Array<
                {
                    "name": string,
                    "price":  number,
                    "currency_name_short": string,
                    "excise_short": string,
                    "barcode":  number,
                    "nm_id":  number,
                    "operation_type_id":  number,
                    "fiscal_doc_number":  number,
                    "fiscal_dt": string, //Data
                    "fiscal_drive_number": string,
                    "rid":  number,
                    "srid": string
                }
            >
        }
    }|undefined>

    getPaidStorageStartTaskCrateReport(queryParams: PeriodFromTo): Promise<{
        "data": {
            "taskId": string
        }
    } | undefined>

    getPaidStorageCheckStatusTaskReport(queryParams: { task_id: string }): Promise<{
        "data": {
            "id": string,
            "status":StatusCratingStoragePaidReport

        }
    }|undefined>

    getPaidStorageReport(queryParams: { taskId: string }):Promise<Array<PaidStorageReport>|undefined>

    /**
     * @description Promise.reject  <WbError|PaidAcceptedError400>
     * @param queryParams
     */
    getPaidAcceptedReport(queryParams: PeriodFromTo):Promise<{
        "report":Array<PaidStorageReport>
    }|undefined>

    getAntifraudReport(queryParams:{
        //Example: date=2023-12-01
        date?:string
    }):Promise<{
      details:Array<{
          "nmID":  number,
          "sum":  number,
          "currency": string,
          "dateFrom": string,//Data
          "dateTo": string,//Data
      }>
    }|undefined>


    getIncorrectAttachmentsReport(queryParams:PeriodFromToData):Promise<Array<
        {
            "amount":  number,
            "date": string,//Example: date=2023-12-01
            "lostReason": string,
            "nmID":  number,
            "photoUrl": string,//url
            "shkID": number
        }>|undefined>


    getCoefficientStorage(queryParams:{data?:string}):Promise<{report:CoefficentItem}|undefined>
    // getCoefficientStorageAND_Logistic(queryParams:{
    //     //Example: date=2023-12-01
    //     date?:String
    // }):Promise<CoefficentItem|undefined>


    getFineIncorrectMarkingReport(queryParams:PeriodFromToData):Promise<{
        report:{
            "amount":  number,
            "date":String,//Data yyyy-mm-dd
            "incomeId":  number,
            "nmID":  number,
            "photoUrls": Array<String>,
            "shkID":  number,
            "sku": string
        }
    }|undefined>

    getAntifraudForChangePropertyOutputReport(queryParams:PeriodFromToData):Promise<{
        report:{
            "amount":  number,
            "date":String,//Data
            "newBarcode": string,
            "newColor": string,
            "newSa": string,
            "newShkID":  number,
            "newSize": string,
            "nmID":  number,
            "oldBarcode": string,
            "oldColor": string,
            "oldSa": string,
            "oldShkID":  number,
            "oldSize": string
        }
    }>
}

class WbAnalyst extends WbBaseAPI implements WbAnalystInterface {
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
    async  postGetStatsPeriod(queryData: Omit<ShameRequestStaticCard, "nmIDs">): Promise<(WbResponse & {
        page:  number;
        isNextPage: Boolean;
        cards: Array<CardStatistic>
    }) | undefined> {
        return this.postFetch(this.listAPI.cardStatisticPeriod,queryData)
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
    async postGetStatsPeriodGroup(queryData: ShameRequestStaticCard): Promise<(WbResponse & {
        page:  number;
        isNextPage: Boolean;
        cards: Array<CardStatistic>
    }) | undefined> {
        return  this.postFetch(this.listAPI.cardStatisticPeriodGroped,queryData)


    }

    /**
     * @description Получение статистики КТ по дням по выбранным nmID.
     * @description Можно получить отчёт максимум за последнюю неделю
     * @description limit 3 in 1min
     * @see WbResponse
     * @throws {WbError}
     * @param queryData
     */
    async postGetStatsDay(queryData: {
        nmIDs: Array< number>;
        period: StaticPeriod;
        timezone?: string;
        aggregationLevel?: "day" | "week"
    }): Promise<WbResponse & {
        data: Array<{
            nmID: number;
            imtName: string;
            vendorCode: string;
            history: HistoryNomenclatureStatisItem
        }>
    }|undefined> {
        return this.postFetch(this.listAPI.cardStatisticOnDayNomenclatureID,queryData)

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
    async postGetStatsDayGroup(queryData: Omit<ShameRequestStaticCard, "orderBy" | "page"> & {
        aggregationLevel?: "day" | "week"
    }): Promise<WbResponse & {
        data: Array<{
            object: CardObject;
            brandName: string;
            tag: Omit<Tag, "color">;
            history: HistoryNomenclatureStatisItem
        }>
    }|undefined> {
        return this.postFetch(this.listAPI.cardStatisticOnDayGroped,queryData)

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
    async postJemCreteReport(queryData: JemReportRequestNmID | JemReportRequestBandAndTag): Promise<WbResponse | undefined> {
        return this.postFetch(this.listAPI.jemCreateReport,queryData)

    }

    /**
     * @description max 3 in 1min
     * @see WbResponse
     * @throws {WbError}
     * @param queryParams
     * @async
     */
    async getJemListReport(queryParams: { filter?: Array<uuid> }): Promise<(WbResponse & {
        data: Array<{
            id: uuid;
            createdAt: string;
            status: StatusCreatingJemReport;
            name: string;
            size:  number;
            startDate: string;
            endDate: string
        }>
    }) | undefined> {
        let url  = new URL(this.listAPI.jemGetListReport)
        for (const urlElement of Object.entries(queryParams)) {
            urlElement[1].forEach(el=>url.searchParams.append(urlElement[0],el))
        }
        return this.getFetch(url.toString() )

    }

    /**
     * @description limit 3 in 1 min
     * @throws {WbError}
     * @param queryData
     * @async
     */
    async postJemRepeatCreateReport(queryData: { downloadId: uuid }): Promise<WbResponse|undefined> {
        return this.postFetch(this.listAPI.jemCreateRepeatReport,queryData)

    }

    /**
     * @description Можно получить отчёт, который сгенерирован в последние 48 часов.
     * @description limit 3 in 1 min
     * @description Отчет будет загружен внутри архива ZIP в формате CSV.
     * @throws {WbError}
     * @param queryParams
     */
    async getJemReport(queryParams: { downloadId: uuid }): Promise<BinaryData|undefined> {
        return fetch(new URL(this.listAPI.jemGetReport(queryParams.downloadId).toString()).toString(),{
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
    async postOutputMustMark(queryData: { countries?: Array<string> }, queryParams: PeriodFromTo): Promise<{
        response: {
            data: Array<{
                name: string;
                price:  number;
                currency_name_short: string;
                excise_short: string;
                barcode:  number;
                nm_id:  number;
                operation_type_id:  number;
                fiscal_doc_number:  number;
                fiscal_dt: string;
                fiscal_drive_number: string;
                rid:  number;
                srid: string
            }>
        }
    }| undefined> {
        let url = new URL(this.listAPI.fineForIncorrectMarkingReport)
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
    getPaidStorageStartTaskCrateReport(queryParams: PeriodFromTo): Promise<{ data: { taskId: string } } | undefined> {
        let url = new URL(this.listAPI.storageCreateReport)
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
    async getPaidStorageCheckStatusTaskReport(queryParams: { task_id: string }): Promise<{
        data: { id: string; status: StatusCratingStoragePaidReport }
    } | undefined> {
        return  this.getFetch(this.listAPI.storageGetStatus(queryParams.task_id))

    }


    /**
     * @description Возвращает отчёт по ID задания
     * @description limit 1 in 1min
     * @throws {WbError & {status:400,errorData:string}}
     * @async
     * @param queryParams
     */
    async getPaidStorageReport(queryParams: { taskId: string }):
        Promise<Array<PaidStorageReport>|undefined> {
        return this.getFetch( this.listAPI.storageGetStatus(queryParams.taskId)).then(async (resposne)=>{
            if(resposne?.ok){
                return await resposne.json()
            }
        })
    }

    /**@description Возвращает даты и стоимость приёмки
     * @description максимум за 31 день
     * @description limit 1 in 1min
     * @throws {WbErrorWithTitle | WbErrorWith500}
     * @async
     */
    async getPaidAcceptedReport(queryParams: PeriodFromToData): Promise<{ report: Array<PaidStorageReport> } | undefined> {
        let url = new URL(this.listAPI.acceptedReport)
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
    async getAntifraudReport(queryParams: { date?: string }): Promise<{
        details: Array<{ nmID:  number; sum:  number; currency: string; dateFrom: string; dateTo: string }>
    } | undefined> {
        let url = new URL(this.listAPI.antifraudGetReport)
        for (let urlElement of Object.entries(queryParams)) {
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
    async getIncorrectAttachmentsReport(queryParams:PeriodFromToData): Promise<Array<{
        amount:  number;
        date: string;
        lostReason: string;
        nmID:  number;
        photoUrl: string;
        shkID: number
    }> | undefined> {
        let url = new URL(this.listAPI.antifraudIncorrectSendReport)
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
    getCoefficientStorage(queryParams: {data?:string}): Promise<{ report: CoefficentItem } | undefined> {
        let url = new URL(this.listAPI.storageCoefficientReport)
        for (let urlElement of Object.entries(queryParams)) {
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
    getFineIncorrectMarkingReport(queryParams: PeriodFromToData): Promise<{
        report: {
            amount: number;
            date: string;
            incomeId: number;
            nmID: number;
            photoUrls: Array<string>;
            shkID: number;
            sku: string
        }
    } | undefined> {
        let url = new URL(this.listAPI.fineForIncorrectMarkingReport)
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
    async getAntifraudForChangePropertyOutputReport(queryParams: PeriodFromToData): Promise<{
        report: {
            amount: number;
            date: String;
            newBarcode: string;
            newColor: string;
            newSa: string;
            newShkID: number;
            newSize: string;
            nmID: number;
            oldBarcode: string;
            oldColor: string;
            oldSa: string;
            oldShkID: number;
            oldSize: string
        }
    }> {
        let url = new URL(this.listAPI.antifraudForChangePropertyOutput)
        for (let urlElement of Object.entries(queryParams)) {
            url.searchParams.append(urlElement[0],urlElement[1])
        }
        return  this.getFetch(url.toString())
    }
}