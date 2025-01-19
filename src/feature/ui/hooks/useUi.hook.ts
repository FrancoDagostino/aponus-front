import { useState } from "react";



export interface IUiHook {
    isLoading: boolean
    snackbar: {
        message: string;
        isOpen: boolean;
    }
    showLoading: () => void
    hideLoading: () => void
    onSetSnackbar: (message: string, isOpen: boolean) => void
}


export const useUiHook = (): IUiHook => {

    const [isLoading, setIsLoading] = useState<IUiHook['isLoading']>(false);
    const [snackbar, setSnackbar] = useState<{ message: string, isOpen: boolean }>({
        isOpen: false,
        message: ''
    })

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


    return {
        isLoading,
        snackbar,
        hideLoading,
        showLoading,
        onSetSnackbar
    }
}