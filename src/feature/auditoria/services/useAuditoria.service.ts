import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IAuditoria } from "../models/auditoria.model";

export interface IAuditoriaServiceProps {
    restClient: IRestClient
}

export interface IAuditoriaService {
    getAuditoria: () => Promise<TResponse<IAuditoria[], null>>;
}

export const useAuditoriaService = (props: IAuditoriaServiceProps): IAuditoriaService => {


    const getAuditoria: IAuditoriaService["getAuditoria"] = async () => {
        const url = `${urlBase}/Audit/List/0/0`
        const result = await props.restClient.get<IAuditoria[], null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    return {
        getAuditoria
    }
}   
