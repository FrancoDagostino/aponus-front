import { IListadoComponentes, IListadoPadre } from "../model/product.model";
import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";

export interface IProductListService {
    getProductList: (idType: string) => Promise<TResponse<IListadoPadre[], null>>;
    getProductListForTypeAndDescription: (idType: string, idDescription: string) => Promise<TResponse<IListadoPadre[], null>>;
    postProductComponent: (idProduct: string, quantity: number) => Promise<TResponse<IListadoComponentes, null>>;
}

export interface IProductListServiceProps {
    restClient: IRestClient
}

export const useProductListService = (props: IProductListServiceProps): IProductListService => {

    const getProductList: IProductListService["getProductList"] = async (idType: string) => {

        const url = `${urlBase}/Products/List/${idType}`
        const response = await props.restClient.get<IListadoPadre[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getProductListForTypeAndDescription: IProductListService["getProductListForTypeAndDescription"] = async (idType: string, idDescription: string) => {

        const url = `${urlBase}/Products/List/${idType}/${idDescription}`
        const response = await props.restClient.get<IListadoPadre[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const postProductComponent: IProductListService["postProductComponent"] = async (idProduct: string, quantity: number) => {
        const url = `${urlBase}/Products/NewListComponents`
        const requestBody = { idProducto: idProduct, Cantidad: quantity };

        const response = await props.restClient.post<IListadoComponentes, null>(url, requestBody, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        getProductList,
        getProductListForTypeAndDescription,
        postProductComponent
    }
}