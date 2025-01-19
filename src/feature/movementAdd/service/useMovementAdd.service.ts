import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IFormData } from "../hooks/useModule.hook";
import { IEntity, ISuppliesList } from "../model/movement.model";


export interface IMovementAddServiceProps {
    restClient: IRestClient
}

export interface IMovementAddService {
    postCreateNewMovement: (dataInput: IFormData) => Promise<TResponse<null, null>>
    getSupplyList: () => Promise<TResponse<ISuppliesList[], null>>
    getProviderList: () => Promise<TResponse<IEntity[], null>>
}

export const useMovementAddService = (props: IMovementAddServiceProps): IMovementAddService => {

    const postCreateNewMovement: IMovementAddService["postCreateNewMovement"] = async (dataInput: IFormData) => {
        const url = `${urlBase}/Movments/new`;

        const formData = new FormData();
        formData.append("usuarioCreacion", "Prueba");
        formData.append("destino", dataInput.destinationProcess);
        formData.append("origen", dataInput.sourceProcess);
        formData.append("idProveedorOrigen", "-1");
        formData.append("idProveedorDestino", "1");
        dataInput.supplyItem.forEach(item => {
            formData.append("suministros[]", JSON.stringify({
                idSuministro: item.id,
                cantidad: item.quantity
            }));
        });

        dataInput.files.forEach(file => {
            formData.append("archivos[]", file);
        });

        const response = await props.restClient.post<null, null>(url, formData, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status);
    }

    const getSupplyList: IMovementAddService["getSupplyList"] = async () => {

        const url = `${urlBase}/Supplies/ListFormatted`
        const response = await props.restClient.get<ISuppliesList[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getProviderList: IMovementAddService["getProviderList"] = async () => {
        const url = `${urlBase}/Entities/List/2`
        const response = await props.restClient.get<IEntity[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)

        return createResponseUtil.error(response.data, response.status)
    }

    return {
        postCreateNewMovement,
        getSupplyList,
        getProviderList
    }
}