import { useEffect, useState } from "react"
import { createResultUtil, TResult } from "../../../utils/result.util"
import { IAuthenticationService, ILoginUserPost } from "../services/useAuthentication.service";
import tokenUtil from "../../../utils/token.util";

export interface IUserParams {

}

export interface IAuthStore {
    loginAction: (userParam: ILoginUserPost) => Promise<TResult<{ changePassword: boolean }, null>>;
    logOutAction: () => Promise<TResult<null, null>>;
    status: TStatus
    rol: string
    changePassword: boolean
    recoverPasswordAction: (username: string) => Promise<TResult<null, null>>
    onChangePasswordAction: (username: string, password: string) => Promise<TResult<null, null>>
    username: string
}

interface IUseAuthStoreProps {
    useAuthService: IAuthenticationService
}

type TStatus = 'starting' | 'is not authenticated' | 'is authenticated'

export const useAuthStore = (props: IUseAuthStoreProps): IAuthStore => {
    const [status, setStatus] = useState<TStatus>('starting');
    const [rol, setRol] = useState<string>('')
    const [changePassword, setChangePassword] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')
    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const token: any = tokenUtil.get()
        if (!token) return setStatus('is not authenticated')
        const storedRol = localStorage.getItem('userRole') || "";
        const storedChangePassword = localStorage.getItem('changePassword') || "true";
        const storedUsername = localStorage.getItem('username') || "";
        setRol(storedRol)
        setChangePassword(storedChangePassword === "true")
        setUsername(storedUsername)
        setStatus(storedChangePassword === "true" ? 'is not authenticated' : 'is authenticated')
    }


    const loginAction: IAuthStore["loginAction"] = async (userParam: ILoginUserPost) => {
        const response = await props.useAuthService.onLogin(userParam)
        if (response.isError) {
            setStatus('is not authenticated');
            return createResultUtil.error(null)
        }
        tokenUtil.set(response.data.token);
        const decode = { Rol: response.data.rol }
        setRol(decode.Rol)
        setChangePassword(response.data.changePassword)
        setUsername(userParam.usuario)
        localStorage.setItem('userRole', response.data.rol);
        localStorage.setItem('changePassword', response.data.changePassword.toString());
        localStorage.setItem('username', userParam.usuario);
        setStatus(response.data.changePassword ? 'is not authenticated' : 'is authenticated');
        return createResultUtil.success({ changePassword: response.data.changePassword })
    }

    const logOutAction: IAuthStore["logOutAction"] = async () => {
        tokenUtil.del();
        setStatus('is not authenticated')
        localStorage.removeItem('userRole');
        window.location.replace('')
        return createResultUtil.success(null);
    }

    const recoverPasswordAction: IAuthStore["recoverPasswordAction"] = async (username: string) => {
        const response = await props.useAuthService.onRecoverPassword(username)
        if (response.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const onChangePasswordAction: IAuthStore["onChangePasswordAction"] = async (username: string, password: string) => {
        const response = await props.useAuthService.onChangePassword(username, password)
        if (response.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }
    return {
        status,
        rol,
        changePassword,
        loginAction,
        logOutAction,
        recoverPasswordAction,
        onChangePasswordAction,
        username
    }
}