import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";


export interface IMovementAddServiceProps {
    restClient: IRestClient
}

export interface IMovementAddService {
    postCreateNewMovement: (dataInput: any) => Promise<TResponse<null, null>>
}

export const useMovementAddService = (props: IMovementAddServiceProps): IMovementAddService => {

    const postCreateNewMovement: IMovementAddService["postCreateNewMovement"] = async (dataInput: any) => {
        const url = `${urlBase}/asd`
        const response = await props.restClient.post<null, null>(url, dataInput, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        postCreateNewMovement
    }
}