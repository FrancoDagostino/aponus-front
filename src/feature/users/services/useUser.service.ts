import { IRestClient, urlBase } from "../../../utils/clients/useRest.client"
import { createResponseUtil, TResponse } from "../../../utils/response.util"
import { IUserView } from "../hooks/useUser.hook"
import { IRol } from "../models/user.model"

interface IUseUserServiceProps {
    restClient: IRestClient
}

export interface IUserService {
    createUser: (user: IUserView) => Promise<TResponse<null, null>>
    getRoles: () => Promise<TResponse<IRol[], null>>
}

export const useUserService = (props: IUseUserServiceProps): IUserService => {

    const createUser = async (user: IUserView) => {
        const url = `${urlBase}/users/signin`
        const response = await props.restClient.post<null, null>(url, user, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    const getRoles = async () => {
        const url = `${urlBase}/Users/roles/list`
        const response = await props.restClient.get<IRol[], null>(url, undefined)
        if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        return createResponseUtil.error(response.data, response.status)
    }

    return {
        createUser,
        getRoles
    }

}
