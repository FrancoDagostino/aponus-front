import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IUser } from "../model/user.model";

export interface ILoginUserPost {
    usuario: string;
    contraseña: string;
}

interface IAuthenticationServiceProps {
    restClient: IRestClient
}

export interface IAuthenticationService {
    onLogin: (dataInput: ILoginUserPost) => Promise<TResponse<IUser, any>>
    onRecoverPassword: (username: string) => Promise<TResponse<IUser, any>>
    onChangePassword: (username: string, password: string) => Promise<TResponse<IUser, any>>
}

export const useAuthenticationService = (props: IAuthenticationServiceProps): IAuthenticationService => {

    const onLogin: IAuthenticationService["onLogin"] = async (dataInput: ILoginUserPost) => {
        const url = `${urlBase}/users/login`;
        const response = await props.restClient.post<IUser, any>(url, dataInput, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status)
    }

    const onRecoverPassword: IAuthenticationService["onRecoverPassword"] = async (username: string) => {
        const url = `${urlBase}/users/password/reset/${username}`;
        const response = await props.restClient.post<IUser, any>(url, undefined, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status)
    }

    const onChangePassword: IAuthenticationService["onChangePassword"] = async (username: string, password: string) => {
        const url = `${urlBase}/users/changepassword`;
        const response = await props.restClient.post<IUser, any>(url, {
            usuario: username,
            contraseña: password
        }, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        onLogin,
        onRecoverPassword,
        onChangePassword
    }
}