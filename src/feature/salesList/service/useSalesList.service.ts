import { IRestClient, urlBase } from "../../../utils/clients/useRest.client"
import { createResponseUtil, TResponse } from "../../../utils/response.util"
import { ISale } from "../model/salesList.model"


export interface ISalesListServiceProps {
    restClient: IRestClient
}

export interface ISalesListService {
    getSalesList: () => Promise<TResponse<ISale[], null>>
    removeFile: (idVenta: string, hashArchivo: string) => Promise<TResponse<null, null>>
    saveFile: (idVenta: string, file: File) => Promise<TResponse<null, null>>
    payCuota: (idVenta: string, idCuota: number) => Promise<TResponse<null, null>>
    updateStateSale: (idVenta: string) => Promise<TResponse<null, null>>
}

export const useSalesListService = (props: ISalesListServiceProps): ISalesListService => {
    const getSalesList = async () => {
        const url = `${urlBase}/Sales/List`;
        const response = await props.restClient.get<ISale[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }


    const removeFile = async (idVenta: string, hashArchivo: string) => {
        const url = `${urlBase}/Sales/RemoveFile`;
        const response = await props.restClient.post<null, null>(url, { idVenta, hashArchivo }, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const saveFile = async (idVenta: string, file: File) => {
        const url = `${urlBase}/Sales/Files/Upload`;

        const formData = new FormData();
        formData.append("idVenta", idVenta);
        formData.append("archivos", file);
        const response = await props.restClient.post<null, null>(url, formData, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const payCuota = async (idVenta: string, idCuota: number) => {
        const url = `${urlBase}/Sales/Bills/New`;
        const response = await props.restClient.post<null, null>(url, { idVenta, idCuota: idCuota }, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }


    const updateStateSale = async (idVenta: string) => {
        const url = `${urlBase}/Sales/${idVenta}/State/Update`;
        const response = await props.restClient.post<null, null>(url, undefined, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }
    return {
        getSalesList,
        removeFile,
        saveFile,
        payCuota,
        updateStateSale
    }
}
