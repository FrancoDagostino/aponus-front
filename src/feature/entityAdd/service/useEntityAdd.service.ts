import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { ICountries, IGeoCity, IGeoProvice } from "../../entityList/model/EntityList.model";
import { IFormData } from "../hook/useModule.hook";
import { ICategoria, IEntity } from "../model/entityAdd.model";

interface IEntityAddServiceProps {
    restClient: IRestClient
}

export interface IEntityAddService {
    newEntity: (dataInput: IFormData) => Promise<TResponse<null, null>>;
    editEntity: (dataInput: IFormData, idEntity: number) => Promise<TResponse<null, null>>
    getEntity: (entityId: string) => Promise<TResponse<IEntity[], null>>
    getPaisList: () => Promise<TResponse<ICountries, null>>
    getProvinceList: (geonameId: string) => Promise<TResponse<IGeoProvice[], null>>
    getCityList: (countryCode: string, adminCode: string) => Promise<TResponse<IGeoCity, null>>
    getCategoriaList: (idTipo: number) => Promise<TResponse<ICategoria[], null>>
}

export const useEntityAddService = (props: IEntityAddServiceProps): IEntityAddService => {


    const getCategoriaList = async (idTipo: number) => {
        const url = `${urlBase}/Entities/Categories/List/${idTipo}`
        const response = await props.restClient.get<ICategoria[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }


    const getCityList = async (countryCode: string, adminCode: string) => {
        const url = `${urlBase}/GeoNames/Cities/${countryCode}/${adminCode}`
        const response = await props.restClient.get<IGeoCity, null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }
    const getProvinceList = async (geonameId: string) => {
        const url = `${urlBase}/GeoNames/Provinces_States/${geonameId}`
        const response = await props.restClient.get<IGeoProvice[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getPaisList = async () => {
        const url = `${urlBase}/GeoNames/Countries`
        const response = await props.restClient.get<ICountries, null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }
    const newEntity = async (dataInput: IFormData) => {
        const url = `${urlBase}/Entities/Save`
        const body = {
            ...dataInput,
            idUsuarioRegistro: "administrador",
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
            idUsuarioRegistro: "administrador",
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
        editEntity,
        getPaisList,
        getProvinceList,
        getCityList,
        getCategoriaList
    }

}