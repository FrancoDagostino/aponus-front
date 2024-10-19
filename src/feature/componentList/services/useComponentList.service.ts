import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { IListadoComponentes } from "../model/component.model";
import { createResponseUtil, TResponse } from '../../../utils/response.util';


interface IComponentListServiceProps {
    restClient: IRestClient
}

export interface IComponentListService {
    getComponentList: (idDescription: number) => Promise<TResponse<IListadoComponentes[], null>>;
}

export const useComponentListService = (props: IComponentListServiceProps): IComponentListService => {

    const getComponentList: IComponentListService["getComponentList"] = async (idDescription: number) => {
        const url = `${urlBase}/Components/List/${idDescription}`
        const response = await props.restClient.get<IListadoComponentes[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        getComponentList
    }
}