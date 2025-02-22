import { IDashboardStore } from "../store/useDashboard.store"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { useEffect } from "react"



interface IDashboardHookProps {
    dashboardStore: IDashboardStore
    uiHook: IUiHook
}


export const useDashboardHook = (props: IDashboardHookProps) => {



    useEffect(() => {
        onInit()
    }, [])
    const onInit = async () => {
        props.uiHook.showLoading()
        const result = await props.dashboardStore.getComprasAction()
        props.uiHook.hideLoading()
        if (result.isError) return
        console.log(result.data)
    }
    return {
        onInit
    }
}

