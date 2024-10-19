import { useEffect, useState } from "react"
import { createResultUtil, TResult } from "../../../utils/result.util"
import { IAuthenticationService, ILoginUserPost } from "../services/useAuthentication.service";
import tokenUtil from "../../../utils/token.util";

export interface IUserParams {

}

export interface IAuthStore {
    loginAction: (userParam: ILoginUserPost) => Promise<TResult<any, null>>;
    logOutAction: () => Promise<TResult<any, null>>;
    status: TStatus
}

interface IUseAuthStoreProps {
    useAuthService: IAuthenticationService
}

type TStatus = 'starting' | 'is not authenticated' | 'is authenticated'

export const useAuthStore = (props: IUseAuthStoreProps): IAuthStore => {

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const token = tokenUtil.get()
        if (!token) return setStatus('is authenticated')
        setStatus('is authenticated')
    }

    const [status, setStatus] = useState<TStatus>('is authenticated');

    const loginAction: IAuthStore["loginAction"] = async (userParam: ILoginUserPost) => {
        const response = await props.useAuthService.onLogin(userParam)
        if (response.isError) {
            setStatus('is not authenticated');
            return createResultUtil.error(null)
        }
        tokenUtil.set(response.data.tkn);
        setStatus('is authenticated');
        return createResultUtil.success(response.data)
    }

    const logOutAction: IAuthStore["logOutAction"] = async () => {
        tokenUtil.del();
        setStatus('is not authenticated')
        window.location.replace('')
        return createResultUtil.success(null);
    }
    return {
        status,
        loginAction,
        logOutAction
    }
}