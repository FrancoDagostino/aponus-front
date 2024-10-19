import { useState } from "react";



export interface IUiHook {
    isLoading: boolean
    showLoading: () => void
    hideLoading: () => void
}


export const useUiHook = (): IUiHook => {

    const [isLoading, setIsLoading] = useState<IUiHook['isLoading']>(false);

    const showLoading: IUiHook['showLoading'] = () => setIsLoading(true)

    const hideLoading: IUiHook['hideLoading'] = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }


    return {
        isLoading,
        hideLoading,
        showLoading
    }
}