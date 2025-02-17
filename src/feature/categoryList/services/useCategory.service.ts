import { IComponentDescription, IListadoCategorias, IListadoDescripciones } from "../model/category.model";
import { createResponseUtil, TResponse } from '../../../utils/response.util';
import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";

interface INewDescriptionPost {
    descripcion: string;
    IdTipo: string;
}

interface IAddOrUpdateCategoryPost {
    descripcionTipo: string,
    idTipo: string
}
interface IUpdateDescriptionNew {
    descripcion: string,
    idTipo: string
}

interface IUpdateDescriptionOld {
    idDescripcion: number,
    idTipo: string
}

export interface IUpdateDescriptionPost {
    nueva: IUpdateDescriptionNew,
    anterior: IUpdateDescriptionOld
}

interface IStockListServiceProps {
    restClient: IRestClient
}
export interface ICategoryService {
    getCategoryList: () => Promise<TResponse<IListadoCategorias[], null>>;
    getDescriptionList: (idTipo: string) => Promise<TResponse<IListadoDescripciones[], null>>;
    addCategory: (category: string, idType: string) => Promise<TResponse<void, null>>;
    addDescription: (description: string, idType: string) => Promise<TResponse<void, null>>;
    updateDescription: (idDescription: number, description: string) => Promise<TResponse<void, null>>;
    deleteCategoryType: (idType: string) => Promise<TResponse<null, null>>
    getComponentList: () => Promise<TResponse<IComponentDescription[], null>>;
    deleteComponent: (idAlmacenamiento: string) => Promise<TResponse<null, null>>;
    addComponent: (description: string, idType: string) => Promise<TResponse<void, null>>;
}

export const useCategoryService = (props: IStockListServiceProps): ICategoryService => {


    const addComponent: ICategoryService["addComponent"] = async (description: string, idDescription: string) => {
        console.log("llego")
        const url = `${urlBase}/Categories/Supplies/Descriptions/Save`
        const result = await props.restClient.post<void, null>(url, { nombreDescripcion: description, IdDescripcion: idDescription }, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const deleteComponent: ICategoryService["deleteComponent"] = async (idAlmacenamiento: string) => {
        const url = `${urlBase}/Categories/Supplies/Descriptions/${idAlmacenamiento}/Delete`
        const result = await props.restClient.get<null, null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const getComponentList: ICategoryService["getComponentList"] = async () => {
        const url = `${urlBase}/Categories/Supplies/Descriptions/List`
        const result = await props.restClient.get<IComponentDescription[], null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const deleteCategoryType: ICategoryService["deleteCategoryType"] = async (idType: string) => {
        const url = `${urlBase}/Categories/Products/Types/${idType}/Delete`
        const result = await props.restClient.get<null, null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const getCategoryList: ICategoryService["getCategoryList"] = async () => {

        const url = `${urlBase}/Categories/Products/Types/List`;
        const result = await props.restClient.get<IListadoCategorias[], null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const getDescriptionList: ICategoryService["getDescriptionList"] = async (idTipo: string) => {

        const url = `${urlBase}/Categories/Products/Descriptions/List/${idTipo}`
        const result = await props.restClient.get<IListadoDescripciones[], null>(url, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const addCategory: ICategoryService["addCategory"] = async (category: string, idType: string) => {

        const body: IAddOrUpdateCategoryPost = {
            descripcionTipo: category,
            idTipo: idType
        }
        const url = `${urlBase}/Categories/Products/Types/New`
        const result = await props.restClient.post<void, null>(url, body, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const addDescription: ICategoryService["addDescription"] = async (description: string, idType: string) => {
        const body: INewDescriptionPost = {
            descripcion: description,
            IdTipo: idType,
        };

        const url = `${urlBase}/Categories/Products/Descriptions/New`
        const result = await props.restClient.post<void, null>(url, body, undefined)
        if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }

    const updateDescription: ICategoryService["updateDescription"] = async (idDescription: number, description: string) => {
        const objDescription = {
            nueva: {
                descripcion: description
            },
            anterior: {
                idDescripcion: idDescription
            }
        }
        const url = `${urlBase}/Categories/Products/Type-or-Description/Update`
        const result = await props.restClient.post<null, null>(url, objDescription, undefined)
        if (result.isSuccess) createResponseUtil.success(result.data, result.status)
        return createResponseUtil.error(result.data, result.status)
    }


    return {
        addCategory,
        addDescription,
        getCategoryList,
        getDescriptionList,
        updateDescription,
        deleteCategoryType,
        getComponentList,
        deleteComponent,
        addComponent
    }
} 