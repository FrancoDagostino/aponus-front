import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { IComponent, IComponentAdd } from "../model/componentAdd.model";
import { createResponseUtil, TResponse } from '../../../utils/response.util';


interface IComponentAddServiceProps {
    restClient: IRestClient
}

export interface IComponentAddService {
    postCreateComponent: (newComponent: IComponentAdd, description: string) => Promise<TResponse<null, null>>;
    getComponent: (idDescription: string, idInsumo: string) => Promise<TResponse<IComponent[], null>>
}

export const useComponentAddService = (props: IComponentAddServiceProps): IComponentAddService => {
    //endpoint /Components/List/IdDescription/IdInsumo


    const getComponent = async (idDescription: string, idInsumo: string) => {
        const url = `${urlBase}/Components/List/${idDescription}/${idInsumo}`
        const response = await props.restClient.get<IComponent[], any>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data[0], response.status)
    }
    const postCreateComponent: IComponentAddService["postCreateComponent"] = async (newComponent: IComponentAdd, description: string) => {

        if (newComponent.idComponente === '') {

            let url = `${urlBase}/Supplies/new-id/${description === "CUERPO DE CAÑO" ? 'CUERPO_DE_CANIO' : description.replaceAll(' ', '_')}`
            const responseId = await props.restClient.get<any, any>(url, undefined)

            const idComponent = responseId.isError ? 0 : responseId.data;
            const newComponentSave: IComponentAdd = {
                ...newComponent,
                idComponente: idComponent
            }
            const url2 = `${urlBase}/Supplies/Create-or-Update`
            const response = await props.restClient.post<null, null>(url2, newComponentSave, undefined)
            if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
            return createResponseUtil.error(response.data, response.status)
        } else {
            const newComponentSave: IComponentAdd = {
                ...newComponent,
                idComponente: newComponent.idComponente
            }
            const url2 = `${urlBase}/Supplies/Create-or-Update`
            const response = await props.restClient.post<null, null>(url2, newComponentSave, undefined)
            if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
            return createResponseUtil.error(response.data, response.status)
        }


    }

    //endpoint para borrar /

    return {
        postCreateComponent,
        getComponent
    }
}