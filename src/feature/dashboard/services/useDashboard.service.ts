import { IRestClient, urlBase } from "../../../utils/clients/useRest.client"
import { createResponseUtil, TResponse } from "../../../utils/response.util"
import { IRowContainer } from "../../componentList/model/component.model"
import { IPendingSales, IProducts, IDescriptions, ISalesForMonth } from "../models/dashboard.model"




export interface IDashboardServiceProps {
    restClient: IRestClient
}

export interface IDashboardService {
    getCompras: () => Promise<TResponse<any, any>>
    getPendingSales: () => Promise<TResponse<IPendingSales[], any>>
    getProducts: () => Promise<TResponse<IProducts[], any>>
    getDescription: () => Promise<TResponse<IDescriptions[], any>>
    getSupplieList: (idDescription: number) => Promise<TResponse<IRowContainer, null>>
    getBarChart: () => Promise<TResponse<ISalesForMonth[], any>>
}

export const useDashboardService = (props: IDashboardServiceProps): IDashboardService => {

    const getCompras = async () => {
        const url = `${urlBase}/compras`
        const response = await props.restClient.get(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getPendingSales = async () => {
        const url = `${urlBase}/Dashboard/PendingSales`
        const response = await props.restClient.get<IPendingSales[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getProducts = async () => {
        const url = `${urlBase}/Dashboard/Products`
        const response = await props.restClient.get<IProducts[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getDescription = async () => {
        const url = `${urlBase}/Categories/Supplies/Descriptions/List`
        const response = await props.restClient.get<IDescriptions[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getSupplieList = async (idDescription: number) => {
        const url = `${urlBase}/Dashboard/Supplies/${idDescription}`
        const response = await props.restClient.get<IRowContainer, null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getBarChart = async () => {
        const url = `${urlBase}/Dashboard/SalesAvg`
        const response = await props.restClient.get<ISalesForMonth[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }
    return {
        getCompras,
        getPendingSales,
        getProducts,
        getDescription,
        getSupplieList,
        getBarChart
    }
}