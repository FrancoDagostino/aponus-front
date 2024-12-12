import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { IComponentAdd } from "../model/componentAdd.model";
import { createResponseUtil, TResponse } from '../../../utils/response.util';


interface IComponentAddServiceProps {
    restClient: IRestClient
}

export interface IComponentAddService {
    postCreateComponent: (newComponent: IComponentAdd, description: string) => Promise<TResponse<null, null>>;
}

export const useComponentAddService = (props: IComponentAddServiceProps): IComponentAddService => {

    const postCreateComponent: IComponentAddService["postCreateComponent"] = async (newComponent: IComponentAdd, description: string) => {


        let url = `${urlBase}/Supplies/new-id/${description === "CUERPO DE CAÑO" ? 'CUERPO_DE_CANIO' : description.replaceAll(' ', '_')}`
        const responseId = await props.restClient.get<any, any>(url, undefined)

        const idComponent = responseId.isError ? 0 : responseId.data;
        const newComponentSave: IComponentAdd = {
            ...newComponent,
            idComponente: idComponent
        }

        url = `${urlBase}/Supplies/Create-or-Update`
        const response = await props.restClient.post<null, null>(url, newComponentSave, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        postCreateComponent
    }
}