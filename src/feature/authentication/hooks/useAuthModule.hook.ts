import { useState } from "react";
import { IAuthStore } from "../store/useAuth.store"
import { IUiHook } from "../../ui/hooks/useUi.hook"
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
    onSetRecoverPasswordHandler: () => void
    resetRecoverPasswordHandler: () => void
    isRecoverPassword: boolean
    onRecoverPasswordHandler: () => void
    onPasswordRecoveryHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    passwordRecovery: { password: string, confirmPassword: string, username: string }
    onChangePasswordHandlerRecover: () => void
}


interface IUseAuthModuleHookProps {
    authStore: IAuthStore,
    onNavigate: (url: string) => void,
    uiHook: IUiHook
}

export const useAuthModuleHook = (props: IUseAuthModuleHookProps): IUseAuthModuleHook => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRecoverPassword, setIsRecoverPassword] = useState<boolean>(false);

    const [passwordRecovery, setPasswordRecovery] = useState<{ password: string, confirmPassword: string, username: string }>({ password: '', confirmPassword: '', username: '' });

    const onLoginHandler: IUseAuthModuleHook['onLoginHandler'] = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await props.authStore.loginAction({ usuario: username, contraseña: password });
        setIsLoading(false)
        if (response.isError) {
            setError(true);
            return
        }
        if (response.data.changePassword) {
            return props.onNavigate('/changePassword')
        }
        return props.onNavigate('/dashboard');
    }


    const onPasswordRecoveryHandler: IUseAuthModuleHook['onPasswordRecoveryHandler'] = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordRecovery(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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

    const onSetRecoverPasswordHandler = () => {
        setIsRecoverPassword(!isRecoverPassword)
    }

    const resetRecoverPasswordHandler = () => {
        setIsRecoverPassword(false);
        setPassword('');
    }

    const onRecoverPasswordHandler = async () => {
        props.uiHook.showLoading()
        const response = await props.authStore.recoverPasswordAction(username)
        props.uiHook.hideLoading()
        if (response.isError) return props.uiHook.onSetSnackbar("Error al enviar el correo", true)
        props.uiHook.onSetSnackbar("Se envio un correo para recuperar su contraseña", true)
    }

    const onChangePasswordHandlerRecover = async () => {
        props.uiHook.showLoading()
        await props.authStore.onChangePasswordAction(props.authStore.username, passwordRecovery.password)
        props.uiHook.hideLoading()
        props.authStore.loginAction({ usuario: props.authStore.username, contraseña: passwordRecovery.password })
        props.onNavigate('/dashboard')
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
        onSetRecoverPasswordHandler,
        resetRecoverPasswordHandler,
        isRecoverPassword,
        onRecoverPasswordHandler,
        onPasswordRecoveryHandler,
        passwordRecovery,
        onChangePasswordHandlerRecover
    }
}