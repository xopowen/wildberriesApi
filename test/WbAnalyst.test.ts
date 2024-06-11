import {beforeEach, describe, test, expect, jest, afterAll} from "@jest/globals";
import WbAnalyst from "../WbAnalyst";
import {WbError} from "../WbError";
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

var analyst = new WbAnalyst('1234')
describe('WbAnalyst test api',()=>{
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    afterAll(()=>{
        fetchMock.disableMocks()
    })

    test('nmReportGroupedPost',  async ()=>{
        let data = {
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
        fetchMock.mockResponse(request => {
            expect(request.url).toBe('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail')
            expect(request.headers.has('Authorization')).toBe(true)
            return Promise.resolve({body:JSON.stringify(data),status:200})
        })
       let test =  analyst.nmReportGroupedPost({
            page:1,
            period:{
                begin:new Date().toISOString().slice(0,10),
                end:new Date().toISOString().slice(0,10)
            }
        })
        await expect(test).resolves.toHaveProperty( 'data')


    })
})