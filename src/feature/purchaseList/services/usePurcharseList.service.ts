import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IPucharse } from "../model/pucharseList.model";


export interface IPurchaseListServiceProps {
    restClient: IRestClient
}

export interface IPurchaseListService {
    getPurchaseList: () => Promise<TResponse<IPucharse[], null>>
    removeFile: (idCompra: string, hashArchivo: string) => Promise<TResponse<null, null>>
    saveFile: (idCompra: string, file: File) => Promise<TResponse<null, null>>
}

export const usePurchaseListService = (props: IPurchaseListServiceProps): IPurchaseListService => {


    const getPurchaseList = async () => {
        const url = `${urlBase}/Purchase/List`;
        const response = await props.restClient.get<IPucharse[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const removeFile = async (idCompra: string, hashArchivo: string) => {
        const url = `${urlBase}/Purchase/RemoveFile`;
        const response = await props.restClient.post<null, null>(url, { idCompra, hashArchivo }, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const saveFile = async (idCompra: string, file: File) => {
        const url = `${urlBase}/Purchase/SaveFile`;
        const response = await props.restClient.post<null, null>(url, { idCompra, file }, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }
    return {
        getPurchaseList,
        removeFile,
        saveFile
    }
}