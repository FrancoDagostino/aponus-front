import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { ICompras } from "../../entityList/model/EntityList.model";


export interface IPurchaseListServiceProps {
    restClient: IRestClient
}

export interface IPurchaseListService {
    getPurchaseList: () => Promise<TResponse<ICompras[], null>>
}

export const usePurchaseListService = (props: IPurchaseListServiceProps): IPurchaseListService => {


    const getPurchaseList = async () => {
        const url = `${urlBase}/Purchase/List`;
        const response = await props.restClient.get<ICompras[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    return {
        getPurchaseList
    }
}