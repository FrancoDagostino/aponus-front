import { IRestClient } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IUser } from "../model/user.model";

export interface ILoginUserPost {
    username: string;
    password: string;
}

interface IAuthenticationServiceProps {
    restClient: IRestClient
}

export interface IAuthenticationService {
    onLogin: (dataInput: ILoginUserPost) => Promise<TResponse<IUser, any>>
}

export const useAuthenticationService = (props: IAuthenticationServiceProps): IAuthenticationService => {

    const onLogin: IAuthenticationService["onLogin"] = async (dataInput: ILoginUserPost) => {
        const url = "https://localhost:44388/api/Login";
        const response = await props.restClient.post<IUser, any>(url, dataInput, undefined);
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status);
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        onLogin
    }
}