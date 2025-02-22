import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IMovimientoStock } from "../model/movementList.model";



export interface IMovementListServiceProps {
    restClient: IRestClient
}

export interface IMovementListService {
    getMovementList: () => Promise<TResponse<IMovimientoStock[], null>>
    newFileMovement: (file: File, idMovimiento: number) => Promise<TResponse<null, null>>
    deleteFile: (idMovimiento: string, nombreArchivo: string) => Promise<TResponse<null, null>>
}

export const useMovementListService = (props: IMovementListServiceProps): IMovementListService => {

    const getMovementList: IMovementListService["getMovementList"] = async () => {
        const url = `${urlBase}/Movments/List`
        const response = await props.restClient.get<IMovimientoStock[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const newFileMovement: IMovementListService["newFileMovement"] = async (file, idMovimiento) => {
        const url = `${urlBase}/Movments/Files/New`

        const formData = new FormData();
        formData.append("idMovimiento", idMovimiento.toString());
        formData.append("archivos", file);

        const response = await props.restClient.post<null, null>(url, formData, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const deleteFile: IMovementListService["deleteFile"] = async (idMovimiento: string, nombreArchivo: string) => {
        const url = `${urlBase}/Movments/Files/Delete`
        const body = {
            idMovimiento,
            infoArchivos: {
                nombreArchivo: nombreArchivo
            }
        }
        const response = await props.restClient.post<null, null>(url, body, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        getMovementList,
        newFileMovement,
        deleteFile
    }
}
