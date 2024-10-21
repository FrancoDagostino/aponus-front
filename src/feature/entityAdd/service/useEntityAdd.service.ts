import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IFormData } from "../hook/useModule.hook";

interface IEntityAddServiceProps {
    restClient: IRestClient
}

export interface IEntityAddService {
    newEntity: (dataInput: IFormData) => Promise<TResponse<null, null>>;
}

export const useEntityAddService = (props: IEntityAddServiceProps): IEntityAddService => {


    const newEntity = async (dataInput: IFormData) => {
        const url = `${urlBase}/Entities/Save`
        const body = {
            ...dataInput,
            idUsuarioRegistro: "Prueba",
            idTipo: 1,
            idCategoria: 1
        }
        const response = await props.restClient.post<null, null>(url, body, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status);
    }

    return {
        newEntity
    }

}