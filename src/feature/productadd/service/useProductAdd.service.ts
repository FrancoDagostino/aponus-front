import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IProductPost } from "../hooks/useModule.hook";
import { IProduct, IProductDescription, IProductType, IProductWithComponent, IStorageSupplie, ISupplie } from "../model/productAdd.model";

export interface IProductAddServiceProps {
    restClient: IRestClient
}

export interface IProductAddService {
    getStorageSupplies: () => Promise<TResponse<IStorageSupplie[], null>>
    getSupplies: () => Promise<TResponse<ISupplie[], null>>
    getProductTypeList: () => Promise<TResponse<IProductType[], null>>
    getProductDescriptionList: (idType: string) => Promise<TResponse<IProductDescription[], null>>
    saveProduct: (inputData: IProductPost) => Promise<TResponse<null, null>>
    getProduct: (productId: string) => Promise<TResponse<IProduct, null>>
    getComponent: (productId: string) => Promise<TResponse<IProductWithComponent, null>>
}

export const useProductAddService = (props: IProductAddServiceProps): IProductAddService => {

    const getStorageSupplies: IProductAddService["getStorageSupplies"] = async () => {
        const url = `${urlBase}/Categories/Supplies/Descriptions/List`;
        const response = await props.restClient.get<IStorageSupplie[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const getProduct: IProductAddService["getProduct"] = async (productId: string) => {
        const url = `${urlBase}/Products/ListProducts/${productId}`;
        const response = await props.restClient.get<IProduct, null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const getComponent: IProductAddService["getComponent"] = async (productId: string) => {
        const url = `${urlBase}/Products/NewListComponents`;
        const response = await props.restClient.post<IProductWithComponent, null>(url, { idProducto: productId }, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const getSupplies: IProductAddService["getSupplies"] = async () => {
        const url = `${urlBase}/Supplies/ListFormatted`;
        const response = await props.restClient.get<ISupplie[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const getProductTypeList: IProductAddService["getProductTypeList"] = async () => {
        const url = `${urlBase}/Categories/Products/Types/List`;
        const response = await props.restClient.get<IProductType[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const getProductDescriptionList: IProductAddService["getProductDescriptionList"] = async (idType: string) => {
        const url = `${urlBase}/Categories/Products/Descriptions/List/${idType}`;
        const response = await props.restClient.get<IProductDescription[], null>(url, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const saveProduct: IProductAddService["saveProduct"] = async (inputData: IProductPost) => {
        let url = `${urlBase}/Products/Save`

        const bodyProduct = {
            idTipo: inputData.idTipo,
            idDescripcion: inputData.idDescripcion,
            diametroNominal: inputData.diametroNominal,
            tolerancia: inputData.tolerancia
        }
        const responseProduct = await props.restClient.post<string, null>(url, bodyProduct, undefined);

        const idProduct = responseProduct.isError ? '' : responseProduct.data;

        const componentBody: IProductPost["componentes"] = inputData.componentes.map(component => (
            {
                ...component,
                idProducto: idProduct
            }
        ))

        url = `${urlBase}/Products/Components/Save`

        const response = await props.restClient.post<null, null>(url, componentBody, undefined);
        if (response.isError) return createResponseUtil.error(response.data, response.status);
        return createResponseUtil.success(response.data, response.status)
    }

    return {
        getStorageSupplies,
        getSupplies,
        getProductTypeList,
        getProductDescriptionList,
        saveProduct,
        getProduct,
        getComponent
    }
}