import { IRestClient, urlBase } from "../../../utils/clients/useRest.client"
import { createResponseUtil, TResponse } from "../../../utils/response.util"
import { ISale } from "../model/salesList.model"


export interface ISalesListServiceProps {
    restClient: IRestClient
}

export interface ISalesListService {
    getSalesList: () => Promise<TResponse<ISale[], null>>
}

export const useSalesListService = (props: ISalesListServiceProps): ISalesListService => {
    const getSalesList = async () => {
        const url = `${urlBase}/Sales/List`;
        const response = await props.restClient.get<ISale[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    return {
        getSalesList
    }
}   