import { useEffect, useState } from "react"
import { createResultUtil, TResult } from "../../../utils/result.util"
import { IAuthenticationService, ILoginUserPost } from "../services/useAuthentication.service";
import tokenUtil from "../../../utils/token.util";
import { jwtDecode } from "jwt-decode";

export interface IUserParams {

}

export interface IAuthStore {
    loginAction: (userParam: ILoginUserPost) => Promise<TResult<null, null>>;
    logOutAction: () => Promise<TResult<null, null>>;
    status: TStatus
    rol: string
}

interface IUseAuthStoreProps {
    useAuthService: IAuthenticationService
}

type TStatus = 'starting' | 'is not authenticated' | 'is authenticated'

export const useAuthStore = (props: IUseAuthStoreProps): IAuthStore => {
    const [status, setStatus] = useState<TStatus>('starting');
    const [rol, setRol] = useState<string>('')
    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const token: any = tokenUtil.get()
        if (!token) return setStatus('is not authenticated')
        setStatus('is authenticated')
        const decode = jwtDecode(token) as { Rol: string }
        setRol(decode.Rol)
    }


    const loginAction: IAuthStore["loginAction"] = async (userParam: ILoginUserPost) => {
        const response = await props.useAuthService.onLogin(userParam)
        if (response.isError) {
            setStatus('is not authenticated');
            return createResultUtil.error(null)
        }
        tokenUtil.set(response.data);
        const token: any = tokenUtil.get()
        const decode = jwtDecode(token) as { Rol: string }
        setRol(decode.Rol)
        setStatus('is authenticated');
        return createResultUtil.success(null)
    }

    const logOutAction: IAuthStore["logOutAction"] = async () => {
        tokenUtil.del();
        setStatus('is not authenticated')
        window.location.replace('')
        return createResultUtil.success(null);
    }
    return {
        status,
        rol,
        loginAction,
        logOutAction
    }
}