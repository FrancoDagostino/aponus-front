import { useState } from "react";
export interface IUiStore {

}


export interface IAlert {
    isOpen: boolean
    title: string
    message: string
    type: 'alert' | 'warning'
}


export interface IUiHook {
    isLoading: boolean
    snackbar: {
        message: string;
        isOpen: boolean;
    }
    showLoading: () => void
    hideLoading: () => void
    onSetSnackbar: (message: string, isOpen: boolean) => void
    showAlert: (alert: {
        title: IAlert["title"]
        message: IAlert["message"]
        type: IAlert["type"]
        onConfirmHandler?: () => void
    }) => void
    closeAlert: () => void
    alert: IAlert
}


export const useUiHook = (): IUiHook => {
    const [isLoading, setIsLoading] = useState<IUiHook['isLoading']>(false);
    const [snackbar, setSnackbar] = useState<{ message: string, isOpen: boolean }>({
        isOpen: false,
        message: ''
    })

    const [alert, setAlert] = useState<IAlert>({
        isOpen: false,
        title: '',
        message: '',
        type: 'alert'
    })

    const showAlert: IUiHook["showAlert"] = (alert) => {
        setAlert({
            isOpen: true,
            title: alert.title,
            message: alert.message,
            type: alert.type,
        })
    }


    const showLoading: IUiHook['showLoading'] = () => setIsLoading(true)

    const hideLoading: IUiHook['hideLoading'] = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }

    const onSetSnackbar = (message: string, isOpen: boolean) => {
        setSnackbar({
            message,
            isOpen
        })
        setTimeout(() => {
            setSnackbar({
                message,
                isOpen: false
            })
        }, 3000);
    }
    const closeAlert = () => {
        setAlert({ ...alert, isOpen: false })
    }

    return {
        isLoading,
        snackbar,
        hideLoading,
        showLoading,
        onSetSnackbar,
        showAlert,
        closeAlert,
        alert,
    }
}