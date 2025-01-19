import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IMovimientoStock } from "../model/movementList.model";



export interface IMovementListServiceProps {
    restClient: IRestClient
}

export interface IMovementListService {
    getMovementList: () => Promise<TResponse<IMovimientoStock[], null>>
}

export const useMovementListService = (props: IMovementListServiceProps): IMovementListService => {

    const getMovementList: IMovementListService["getMovementList"] = async () => {
        const url = `${urlBase}/Movments/List`
        const response = await props.restClient.get<IMovimientoStock[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    //Eliminar Movimiento: /Movments/IdMovimiento/Delete

    return {
        getMovementList
    }
}
