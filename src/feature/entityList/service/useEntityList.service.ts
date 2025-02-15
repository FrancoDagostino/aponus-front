import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IEntity } from "../model/EntityList.model";


export interface IEntityListServiceProps {
    restClient: IRestClient
}

export interface IEntityListService {
    getEntityList: () => Promise<TResponse<IEntity[], null>>
    getEntityListById: (id: number) => Promise<TResponse<IEntity, null>>
    deleteEntity: (idEntity: number) => Promise<TResponse<null, null>>

}


export const useEntityListService = (props: IEntityListServiceProps): IEntityListService => {


    const getEntityList: IEntityListService["getEntityList"] = async () => {

        const url = `${urlBase}/Entities/List`
        const response = await props.restClient.get<IEntity[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }


    const getEntityListById: IEntityListService["getEntityListById"] = async (id: number) => {

        const url = `${urlBase}/Entities/List/${id}`
        const response = await props.restClient.get<IEntity, null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const deleteEntity: IEntityListService["deleteEntity"] = async (idEntity: number) => {
        const url = `${urlBase}/Entities/Delete/${idEntity}`
        const response = await props.restClient.post<null, null>(url, undefined, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        getEntityList,
        getEntityListById,
        deleteEntity,
    }
}