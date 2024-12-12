import { useState } from "react";
import { IAuthStore } from "../store/useAuth.store"

interface IUseAuthModuleHook {
    username: string,
    password: string,
    error: boolean,
    isLoading: boolean,
    RetryLoginComputed: boolean,
    onChangeUserNameHandler: (value: string) => void,
    onChangePasswordHandler: (value: string) => void,
    errorHandler: (value: boolean) => void,
    isLoadingHandler: (value: boolean) => void,
    onLoginHandler: (e: React.FormEvent<HTMLFormElement>) => void
    onLogOutHandler: () => void
}


interface IUseAuthModuleHookProps {
    authStore: IAuthStore,
    onNavigate: (url: string) => void
}

export const useAuthModuleHook = (props: IUseAuthModuleHookProps): IUseAuthModuleHook => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onLoginHandler: IUseAuthModuleHook['onLoginHandler'] = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await props.authStore.loginAction({ usuario: username, contraseña: password });
        setIsLoading(false)
        if (response.isError) {
            setError(true);
            return
        }

        return props.onNavigate('/');
    }

    const onLogOutHandler: IUseAuthModuleHook["onLogOutHandler"] = async () => {
        const result = await props.authStore.logOutAction()
        if (result.isError) return
        window.location.replace('')
    };

    const onChangeUserNameHandler = (value: string) => {
        setUserName(value)
    }

    const onChangePasswordHandler = (value: string) => {
        setPassword(value)
    }

    const errorHandler = (value: boolean) => {
        setError(value)
    }

    const isLoadingHandler = (value: boolean) => {
        setIsLoading(value)
    }

    const RetryLoginComputed: boolean = !(username != '' && password != '');

    return {
        username: username,
        password,
        error,
        isLoading,
        RetryLoginComputed,
        onLoginHandler,
        onLogOutHandler,
        onChangeUserNameHandler,
        onChangePasswordHandler,
        errorHandler,
        isLoadingHandler,
    }
}