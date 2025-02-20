import { createResultUtil, TResult } from "../../../utils/result.util"
import { IRol } from "../models/user.model"
import { IUserService } from "../services/useUser.service"
import { useState } from "react"
export interface IUserStoreProps {
    userService: IUserService
}

export interface IUserStore {
    createUserAction: (user: any) => Promise<TResult<null, null>>
    getRolesAction: () => Promise<TResult<null, null>>
    roles: IRol[]
}


export const useUserStore = (props: IUserStoreProps): IUserStore => {

    const [roles, setRoles] = useState<IRol[]>([])

    const createUserAction = async (user: any) => {
        const result = await props.userService.createUser(user)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(result.data)
    }

    const getRolesAction = async () => {
        const result = await props.userService.getRoles()
        if (result.isError) return createResultUtil.error(null)
        setRoles(result.data)
        return createResultUtil.success(null)
    }
    return {
        createUserAction,
        getRolesAction,
        roles
    }

}