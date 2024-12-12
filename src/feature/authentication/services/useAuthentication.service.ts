import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";

export interface ILoginUserPost {
    usuario: string;
    contraseña: string;
}

interface IAuthenticationServiceProps {
    restClient: IRestClient
}

export interface IAuthenticationService {
    onLogin: (dataInput: ILoginUserPost) => Promise<TResponse<string, any>>
}

export const useAuthenticationService = (props: IAuthenticationServiceProps): IAuthenticationService => {

    const onLogin: IAuthenticationService["onLogin"] = async (dataInput: ILoginUserPost) => {
        const url = `${urlBase}/users/login`;
        const response = await props.restClient.post<string, any>(url, dataInput, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        onLogin
    }
}