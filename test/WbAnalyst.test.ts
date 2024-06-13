import {beforeEach, describe, test, expect, jest, afterAll} from "@jest/globals";
import WbAnalyst, {FiendSort} from "../WbAnalyst";
import {WbError} from "../WbError";
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import fetch from "node-fetch";
enableFetchMocks()
var token = '1234'
var analyst = new WbAnalyst(token)
let dataResponse400 = {
    // @ts-ignore
    "data": null,
    "error": true,
    "errorText": "Текст ошибки",
    "additionalErrors": [
        {
            "field": "string",
            "description": "string"
        }
    ]
}
let dataResponse403 = {
    "data": null,
    "error": true,
    "errorText": "Текст ошибки",
    "additionalErrors": [
        {
            "field": "string",
            "description": "string"
        }
    ]
}
let dataResponse401 = {
    "code": 401,
    "message": "Текст ошибки"
}
let dataResponse429 ={
    "code": 429,
    "message": "Текст ошибки"
}
let dataResponse500 = {
    "data": null,
    "error": true,
    "errorText": "Текст ошибки",
    "additionalErrors": [
        {
            "field": "string",
            "description": "string"
        }
    ]
}


describe('WbAnalyst test api',()=>{
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    afterAll(()=>{
        fetchMock.disableMocks()
    })

    //Воронка продаж
    test('nmReportGroupedPost',  async ()=>{
        let dataResponse200 = {
            "data": {
                "page": 1,
                "isNextPage": true,
                "cards": [
                    {
                        "nmID": 1234567,
                        "vendorCode": "supplierVendor",
                        "brandName": "Some",
                        "tags": [
                            {
                                "id": 123,
                                "name": "Sale"
                            }
                        ],
                        "object": {
                            "id": 447,
                            "name": "Кондиционеры для волос"
                        },
                        "statistics": {
                            "selectedPeriod": {
                                "begin": "2023-06-01 20:05:32",
                                "end": "2024-03-01 20:05:32",
                                "openCardCount": 0,
                                "addToCartCount": 0,
                                "ordersCount": 0,
                                "ordersSumRub": 0,
                                "buyoutsCount": 0,
                                "buyoutsSumRub": 0,
                                "cancelCount": 0,
                                "cancelSumRub": 0,
                                "avgPriceRub": 0,
                                "avgOrdersCountPerDay": 0,
                                "conversions": {
                                    "addToCartPercent": 0,
                                    "cartToOrderPercent": 0,
                                    "buyoutsPercent": 0
                                }
                            },
                            "previousPeriod": {
                                "begin": "2023-05-07 20:05:31",
                                "end": "2023-06-01 20:05:31",
                                "openCardCount": 0,
                                "addToCartCount": 0,
                                "ordersCount": 1,
                                "ordersSumRub": 1262,
                                "buyoutsCount": 1,
                                "buyoutsSumRub": 1262,
                                "cancelCount": 0,
                                "cancelSumRub": 0,
                                "avgPriceRub": 1262,
                                "avgOrdersCountPerDay": 0.04,
                                "conversions": {
                                    "addToCartPercent": 0,
                                    "cartToOrderPercent": 0,
                                    "buyoutsPercent": 100
                                }
                            },
                            "periodComparison": {
                                "openCardDynamics": 0,
                                "addToCartDynamics": 0,
                                "ordersCountDynamics": -100,
                                "ordersSumRubDynamics": -100,
                                "buyoutsCountDynamics": -100,
                                "buyoutsSumRubDynamics": -100,
                                "cancelCountDynamics": 0,
                                "cancelSumRubDynamics": 0,
                                "avgOrdersCountPerDayDynamics": 0,
                                "avgPriceRubDynamics": -100,
                                "conversions": {
                                    "addToCartPercent": 0,
                                    "cartToOrderPercent": 0,
                                    "buyoutsPercent": -100
                                }
                            }
                        },
                        "stocks": {
                            "stocksMp": 0,
                            "stocksWb": 0
                        }
                    }
                ]
            },
            "error": true,
            "errorText": "",
            "additionalErrors": [
                {
                    "field": "string",
                    "description": "string"
                }
            ]
        }
        let dataRequest = {
            page:1,
            period:{
                begin:new Date().toISOString().slice(0,10),
                end:new Date().toISOString().slice(0,10)
            }
        }
        let errors = {
            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail'
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })
        await expect( analyst.nmReportGroupedPost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)

        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
           await analyst.nmReportGroupedPost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
               expect(err.errorData).toEqual(errors[errorItem])
            })
        }

    })
    test('nmReportGroupedTagBrandPost',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/grouped'
        let dataResponse200 = {
            "data": {
                "page": 1,
                "isNextPage": true,
                "groups": [
                    {
                        "brandName": "Some",
                        "tags": [
                            {
                                "id": 123,
                                "name": "Sale"
                            }
                        ],
                        "object": {
                            "id": 1668,
                            "name": "Воски для волос"
                        },
                        "statistics": {
                            "selectedPeriod": {
                                "begin": "2023-10-04 20:05:32",
                                "end": "2024-03-01 20:05:32",
                                "openCardCount": 0,
                                "addToCartCount": 0,
                                "ordersCount": 0,
                                "ordersSumRub": 0,
                                "buyoutsCount": 0,
                                "buyoutsSumRub": 0,
                                "cancelCount": 0,
                                "cancelSumRub": 0,
                                "avgPriceRub": 0,
                                "avgOrdersCountPerDay": 0,
                                "conversions": {
                                    "addToCartPercent": 0,
                                    "cartToOrderPercent": 0,
                                    "buyoutsPercent": 0
                                }
                            },
                            "previousPeriod": {
                                "begin": "2023-11-04 20:05:31",
                                "end": "2024-03-01 20:05:31",
                                "openCardCount": 466,
                                "addToCartCount": 72,
                                "ordersCount": 84,
                                "ordersSumRub": 127060.42,
                                "buyoutsCount": 69,
                                "buyoutsSumRub": 104898.42,
                                "cancelCount": 13,
                                "cancelSumRub": 0,
                                "avgPriceRub": 1562.65,
                                "avgOrdersCountPerDay": 0.72,
                                "conversions": {
                                    "addToCartPercent": 15.5,
                                    "cartToOrderPercent": 116.7,
                                    "buyoutsPercent": 84.1
                                }
                            },
                            "periodComparison": {
                                "openCardDynamics": -100,
                                "addToCartDynamics": -100,
                                "ordersCountDynamics": -100,
                                "ordersSumRubDynamics": -100,
                                "buyoutsCountDynamics": -100,
                                "buyoutsSumRubDynamics": -100,
                                "cancelCountDynamics": 0,
                                "cancelSumRubDynamics": 0,
                                "avgOrdersCountPerDayDynamics": 0,
                                "avgPriceRubDynamics": -100,
                                "conversions": {
                                    "addToCartPercent": -100,
                                    "cartToOrderPercent": -100,
                                    "buyoutsPercent": -100
                                }
                            }
                        }
                    }
                ]
            },
            "error": false,
            "errorText": "",
            "additionalErrors": [
                {
                    "field": "string",
                    "description": "string"
                }
            ]
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        let dataRequest = {
            "objectIDs": [
                358
            ],
            "brandNames": [
                "Some"
            ],
            "tagIDs": [
                123
            ],
            "timezone": "Europe/Moscow",
            "period": {
                "begin": "2023-10-04 20:05:32",
                "end": "2024-03-01 20:05:32"
            },
            "orderBy": {
                "field": "ordersSumRub" as FiendSort,
                "mode": "asc"
            },
            "page": 1
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })
        await expect( analyst.nmReportGroupedTagBrandPost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            await analyst.nmReportGroupedTagBrandPost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test('nmReportDayGroupedPost',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail/history'
        let dataResponse200 = {
            "data": [
                {
                    "nmID": 1234567,
                    "imtName": "Наименование КТ",
                    "vendorCode": "supplierVendor",
                    "history": [
                        {
                            "dt": "2023-06-20",
                            "openCardCount": 26,
                            "addToCartCount": 1,
                            "ordersCount": 0,
                            "ordersSumRub": 0,
                            "buyoutsCount": 0,
                            "buyoutsSumRub": 0,
                            "buyoutPercent": 0,
                            "addToCartConversion": 3.8,
                            "cartToOrderConversion": 0
                        }
                    ]
                }
            ],
            "error": true,
            "errorText": "",
            "additionalErrors": [
                {
                    "field": "string",
                    "description": "string"
                }
            ]
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        let dataRequest = {
            "nmIDs": [
                1234567
            ],
            "period": {
                "begin": "2023-06-20",
                "end": "2023-06-22"
            },
            "timezone": "Europe/Moscow",
            "aggregationLevel": 'day'
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect( analyst.nmReportDayGroupedPost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.nmReportDayGroupedPost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test( 'nmReportDayGroupedTagBrandPost',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/grouped/history'
        let dataResponse200 = {
            "data": [
                {
                    "object": {
                        "id": 358,
                        "name": "Шампуни"
                    },
                    "brandName": "Some",
                    "tag": {
                        "id": 123,
                        "name": "Sale"
                    },
                    "history": [
                        {
                            "dt": "2023-06-21",
                            "openCardCount": 0,
                            "addToCartCount": 0,
                            "ordersCount": 0,
                            "ordersSumRub": 0,
                            "buyoutsCount": 0,
                            "buyoutsSumRub": 0,
                            "buyoutPercent": 0,
                            "addToCartConversion": 0,
                            "cartToOrderConversion": 0
                        }
                    ]
                }
            ],
            "error": true,
            "errorText": "",
            "additionalErrors": [
                {
                    "field": "string",
                    "description": "string"
                }
            ]
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        let dataRequest ={
            "objectIDs": [
                358
            ],
            "brandNames": [
                "Some"
            ],
            "tagIDs": [
                123
            ],
            "period": {
                "begin": "2023-06-21",
                "end": "2023-06-23"
            },
            "timezone": "Europe/Moscow",
            "aggregationLevel": "day"
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect( analyst.nmReportDayGroupedTagBrandPost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.nmReportDayGroupedTagBrandPost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    //Воронка продаж (Джем)
    test(   'nmReportJemCretePost',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads'
        let dataRequest ={
            "id": "06eae887-9d9f-491f-b16a-bb1766fcb8d2",
            "reportType": "DETAIL_HISTORY_REPORT",
            "userReportName": "Card report",
            "params": {
                "nmIDs": [
                    1234567
                ],
                "subjectIDs": [
                    1234567
                ],
                "brandNames": [
                    "Name"
                ],
                "tagIDs": [
                    1234567
                ],
                "startDate": "2023-06-21",
                "endDate": "2023-06-23",
                "timezone": "Europe/Moscow",
                "aggregationLevel": "day",
                "skipDeletedNm": false
            }
        }

        let dataResponse200 ={
            "data": "Началось формирование файла/отчета",
            "error": false,
            "errorText": "",
            "additionalErrors": null
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect(analyst.nmReportJemCretePost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.nmReportJemCretePost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test(   'nmReportJemListGet',async ()=>{

        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads'
        let dataResponse200 ={
            "data": [
                {
                    "id": "06eae887-9d9f-491f-b16a-bb1766fcb8d2",
                    "createdAt": "2023-06-26 20:05:32",
                    "status": "SUCCESS",
                    "name": "Card report",
                    "size": 123,
                    "startDate": "2023-06-21",
                    "endDate": "2023-06-23"
                }
            ],
            "error": false,
            "errorText": "string",
            "additionalErrors": null
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url+'?filter=12')
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect( analyst.nmReportJemListGet({filter:['12']}))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.nmReportJemListGet().then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test(   'nmReportJemRepeatPost',async ()=>{

        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/retry'
        let dataRequest ={
            "downloadId": "06eea887-9d9f-491f-b16a-bb1766fcb8d2"
        }

        let dataResponse200 ={
            "data": "Началось переформирование файла/отчета",
            "error": false,
            "errorText": "",
            "additionalErrors": null
        }
        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url)
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect(  analyst.nmReportJemRepeatPost(dataRequest))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await  analyst.nmReportJemRepeatPost(dataRequest).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test(   'nmReportJemReportGet',async ()=>{

        let url = 'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/'+1
        let dataRequest ='1'

        let errors = {

            400:dataResponse400,
            429:dataResponse429,
            401:dataResponse401,
            403:dataResponse403,
            500:dataResponse500
        }

        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.nmReportJemReportGet({downloadId:1}).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    //Товары с обязательной маркировкой
    test( 'analyticsOutputMustMarkPost',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report'+'?dateFrom=2012-11-11&dateTo=2013-11-11'
        let dataRequest ={
            "countries": [
                "AM",
                "RU"
            ]
        }

        let dataResponse200 ={
            "data": "Началось формирование файла/отчета",
            "error": false,
            "errorText": "",
            "additionalErrors": null
        }
        let errors = {

            400:'Bad \'dateFrom\' param',

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect(analyst.analyticsOutputMustMarkPost(dataRequest,{dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.analyticsOutputMustMarkPost({},{dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    //Платное хранение
    test( 'paidStorageCrateTaskReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage'+'?dateFrom=2012-11-11&dateTo=2013-11-11'
        let dataRequest ={
            "countries": [
                "AM",
                "RU"
            ]
        }

        let dataResponse200 ={
            "data": {
                "taskId": "219eaecf-e532-4bd8-9f15-8036ec1b042d"
            }
        }
        let errors = {

            400:{
                "errors": [
                    "dateTo should be greater dateFrom"
                ]
            },

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.paidStorageCrateTaskReportGet({dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            await analyst.paidStorageCrateTaskReportGet( {dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test('paidStorageCheckStatusTaskGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/1/status'


        let dataResponse200 ={
            "data": {
                "id": "cad56ec5-91ec-43a2-b5e8-efcf244cf309",
                "status": "done"
            }
        }
        let errors = {

            400:'Bad \'dateFrom\' param',

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.paidStorageCheckStatusTaskGet({task_id:'1'}))
            .resolves.toHaveProperty( 'data',dataResponse200.data)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            await analyst.paidStorageCheckStatusTaskGet( {task_id:'1'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test( 'paidStorageReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/1/download'


        let dataResponse200 =[
            {
                "date": "2023-10-01",
                "logWarehouseCoef": 1,
                "officeId": 507,
                "warehouse": "Коледино",
                "warehouseCoef": 1.7,
                "giId": 123456,
                "chrtId": 1234567,
                "size": "0",
                "barcode": "",
                "subject": "Маски одноразовые",
                "brand": "1000 Каталог",
                "vendorCode": "567383",
                "nmId": 1234567,
                "volume": 12,
                "calcType": "короба: без габаритов",
                "warehousePrice": 7.65,
                "barcodesCount": 1,
                "palletPlaceCode": 0,
                "palletCount": 0,
                "originalDate": "2023-03-01",
                "loyaltyDiscount": 10,
                "tariffFixDate": "2023-10-01",
                "tariffLowerDate": "2023-11-01"
            }
        ]
        let errors = {

            400:'Bad \'dateFrom\' param',

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.paidStorageReportGet({taskId:'1'}))
            .resolves.toEqual( dataResponse200)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            await analyst.paidStorageReportGet( {taskId:'1'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    //Платная приёмка
    test( "paidAcceptedReportGet",async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/acceptance-report'+'?dateFrom=2012-11-11&dateTo=2013-11-11'


        let dataResponse200 ={
            "report": [
                {
                    "count": 40,
                    "giCreateDate": "2023-08-23",
                    "incomeId": 11834106,
                    "nmID": 123456789,
                    "shkСreateDate": "2023-04-10",
                    "subjectName": "Добавки пищевые",
                    "sum": 200,
                    "total": 200.5
                }
            ]
        }
        let errors = {

            400:{
                "title": "Bad Request",
                "detail": "parameter \"dateFrom\" in query has an error: value is required but missing",
                "requestId": "kr53d2bRKYmkK2N6zaNKHs",
                "origin": "seller-analytics-api"
            },
            500:{
                "error": true,
                "errorText": "Internal server error"
            }

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.paidAcceptedReportGet( {dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'report',dataResponse200.report)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })

            await analyst.paidAcceptedReportGet({dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    //Отчёты по удержаниям
    test( 'analyseAntifraudDetailsReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/antifraud-details'


        let dataResponse200 ={
            "details": [
                {
                    "nmID": 123456789,
                    "sum": 3540,
                    "currency": "RUB",
                    "dateFrom": "2023-08-23",
                    "dateTo": "2023-08-29"
                }
            ]
        }
        let errors = {

            400:{
                "errors": [
                    "date year should be greater or equal 2023"
                ]
            },

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url +'?date=2012-11-11')
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })

        // @ts-ignore
        await expect(analyst.analyseAntifraudDetailsReportGet( {date:'2012-11-11'} ))
            .resolves.toHaveProperty( 'details',dataResponse200.details)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })
            // @ts-ignore
            await analyst.analyseAntifraudDetailsReportGet(  ).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test( 'analyseIncorrectAttachmentsReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/incorrect-attachments'+'?dateFrom=2012-11-11&dateTo=2013-11-11'


        let dataResponse200 ={
            "report": [
                {
                    "amount": 24514.5,
                    "date": "2023-12-15",
                    "lostReason": "Подмена. Вместо большой железной дороги поступила маленькая коробка.",
                    "nmID": 123456789,
                    "photoUrl": "https://mstatic.wbstatic.net/writeoff_to_the_seller/12345678911-2023-06-21T12:13:37.768Z-1.png",
                    "shkID": 14555724540
                }
            ]
        }
        let errors = {

            400:{
                "title": "Bad Request",
                "detail": "parameter \"dateFrom\" in query has an error: value is required but missing",
                "requestId": "kr53d2bRKYmkK2N6zaNKHs",
                "origin": "seller-analytics-api"
            }

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.analyseIncorrectAttachmentsReportGet( {dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'report',dataResponse200.report)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })

            await analyst.analyseIncorrectAttachmentsReportGet({dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

    test( 'analyseCoefficientStorageGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/storage-coefficient'
        let dataResponse200 ={
            "report": [
                {
                    "actualHeight": 6,
                    "actualLength": 39,
                    "actualVolume": 7.02,
                    "actualWidth": 30,
                    "date": "2023-04-11T12:21:19Z",
                    "dimensionDifference": 101.74,
                    "height": 10,
                    "length": 30,
                    "logWarehouseCoef": 1,
                    "nmID": 123456789,
                    "photoUrls": [
                        "https://photos.wbstatic.net/handheld-goods-measurements-photo/123456789_73984211-e6c3-44e2-66af-0d44d2620308.jpg",
                        "https://photos.wbstatic.net/handheld-goods-measurements-photo/123456789_8ee5ff5e-c6bb-426c-7d12-c2dd228c0f62.jpg"
                    ],
                    "title": "Сухой корм для крупных собак ассорти мясное, 10 кг",
                    "volume": 6.9,
                    "width": 23
                }
            ]
        }
        let errors = {
            400:{
                "errors": [
                    "date cannot be earlier than 2022-10-31"
                ]
            },
            500:{
                "error": true,
                "errorText": "Internal server error"
            }
        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.analyseCoefficientStorageGet( ))
            .resolves.toHaveProperty( 'report',dataResponse200.report)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url+'?date=2012-11-11')
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })

            await analyst.analyseCoefficientStorageGet({date :'2012-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test( 'analyseFineIncorrectMarkingReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-labeling'+'?dateFrom=2012-11-11&dateTo=2013-11-11'


        let dataResponse200 ={
            "report": [
                {
                    "amount": 1500,
                    "date": "2024-03-26T01:00:00Z",
                    "incomeId": 18484008,
                    "nmID": 49434732,
                    "photoUrls": [
                        "https://static-basket-03.wb.ru/vol54/photo-fixation-violation-shk-excise/12345678900-1811460999-1.jpg",
                        "https://static-basket-03.wb.ru/vol54/photo-fixation-violation-shk-excise/12345678900-1811461000-2.jpg",
                        "https://static-basket-03.wb.ru/vol54/photo-fixation-violation-shk-excise/12345678900-1811461001-3.jpg"
                    ],
                    "shkID": 17346434621,
                    "sku": "4630153500834"
                }
            ]
        }
        let errors = {

            400:{
                "title": "Bad Request",
                "detail": "parameter \"dateFrom\" in query has an error: value is required but missing",
                "requestId": "kr53d2bRKYmkK2N6zaNKHs",
                "origin": "seller-analytics-api"
            }

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.analyseFineIncorrectMarkingReportGet( {dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'report',dataResponse200.report)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })

            await analyst.analyseFineIncorrectMarkingReportGet({dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })
    test( 'analyseAntifraudForChangePropertyOutputReportGet',async ()=>{
        let url = 'https://seller-analytics-api.wildberries.ru/api/v1/analytics/characteristics-change'+'?dateFrom=2012-11-11&dateTo=2013-11-11'


        let dataResponse200 ={
            "report": [
                {
                    "amount": 135890,
                    "date": "2024-03-01T01:00:00Z",
                    "newBarcode": "22222222222222",
                    "newColor": "темно-синий,голубой",
                    "newSa": "hjt13/темно-синий,голубой",
                    "newShkID": 44444444444,
                    "newSize": "80",
                    "nmID": 123654789,
                    "oldBarcode": "111111111111111",
                    "oldColor": "темно-синий,голубой",
                    "oldSa": "hjt13/темно-синий,голубой",
                    "oldShkID": 333333333,
                    "oldSize": "43"
                }
            ]
        }
        let errors = {

            400:{
                "title": "Bad Request",
                "detail": "can't parse dateFrom",
                "requestId": "kr53d2bRKYmkK2N6zaNKHs",
                "origin": "seller-analytics-api"
            }

        }
        fetchMock.mockResponse(request => {
            expect(request.url).toBe(url )
            expect(request.headers.has('Authorization')).toBe(true)
            expect(request.headers.get('Authorization')).toEqual(token)
            return Promise.resolve({body:JSON.stringify(dataResponse200),status:200})
        })


        await expect(analyst.analyseAntifraudForChangePropertyOutputReportGet( {dateFrom:'2012-11-11',dateTo:'2013-11-11'}))
            .resolves.toHaveProperty( 'report',dataResponse200.report)


        for (const errorItem in  errors ) {
            fetchMock.mockResponse(request => {
                expect(request.url).toBe(url)
                expect(request.headers.has('Authorization')).toBe(true)
                expect(request.headers.get('Authorization')).toEqual(token)
                // @ts-ignore
                return Promise.resolve({body:JSON.stringify(errors[errorItem] ),status:+errorItem })
            })

            await analyst.analyseAntifraudForChangePropertyOutputReportGet({dateFrom:'2012-11-11',dateTo:'2013-11-11'}).then(data=>{
                expect(data).toBeUndefined()
            }).catch(err=>{
                expect(err).toHaveProperty('status',+errorItem)
                // @ts-ignore
                expect(err.errorData).toEqual(errors[errorItem])
            })
        }
    })

})