import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IFormData } from "../hook/useModule.hook";
import { IEntity } from "../model/entityAdd.model";

interface IEntityAddServiceProps {
    restClient: IRestClient
}

export interface IEntityAddService {
    newEntity: (dataInput: IFormData) => Promise<TResponse<null, null>>;
    editEntity: (dataInput: IFormData, idEntity: number) => Promise<TResponse<null, null>>
    getEntity: (entityId: string) => Promise<TResponse<IEntity[], null>>
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

    const getEntity = async (entityId: string) => {
        const url = `${urlBase}/Entities/List/0/0/${entityId}`
        const response = await props.restClient.get<IEntity[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const editEntity = async (dataInput: IFormData) => {
        const url = `${urlBase}/Entities/Save`
        const body = {
            ...dataInput,
            idUsuarioRegistro: "Prueba",
            idTipo: 1,
            idCategoria: 1
        }
        const response = await props.restClient.post<null, null>(url, body, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    // /Types/List
    // /Categories/List/idTipo

    //Borrar Entidad: /Entities/delete/idEntidad
    return {
        newEntity,
        getEntity,
        editEntity
    }

}