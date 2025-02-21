import { IRestClient, urlBase } from "../../../utils/clients/useRest.client"
import { createResponseUtil, TResponse } from "../../../utils/response.util"




export interface IDashboardServiceProps {
    restClient: IRestClient
}

export interface IDashboardService {
    getCompras: () => Promise<TResponse<any, any>>
}

export const useDashboardService = (props: IDashboardServiceProps): IDashboardService => {

    const getCompras = async () => {
        const url = `${urlBase}/compras`
        const response = await props.restClient.get(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        getCompras
    }
}