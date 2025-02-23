import { IDashboardStore } from "../store/useDashboard.store"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { useEffect, useState } from "react"



interface IDashboardHookProps {
    dashboardStore: IDashboardStore
    uiHook: IUiHook
}

interface IDashboardHook {
    idDescriptionFounded: string
    onChangeTabsHandler: (idDescription: string) => Promise<void>
}

export const useDashboardHook = (props: IDashboardHookProps): IDashboardHook => {

    const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");


    useEffect(() => {
        onInit()
    }, [])
    const onInit = async () => {
        props.uiHook.showLoading()
        const result = await props.dashboardStore.getPendingSalesAction()
        await props.dashboardStore.getProductsAction()
        props.uiHook.hideLoading()
        props.uiHook.showLoading()
        await props.dashboardStore.getDescriptionAction()
        props.uiHook.hideLoading()
        props.uiHook.showLoading()
        await props.dashboardStore.getBarChartAction()
        props.uiHook.hideLoading()
        if (result.isError) return
    }

    const onChangeTabsHandler = async (idDescription: string) => {
        props.uiHook.showLoading()
        setIdDescriptionFounded(idDescription);
        await props.dashboardStore.getSupplieListAction(Number(idDescription))
        props.uiHook.hideLoading()
    };

    return {
        idDescriptionFounded,
        onChangeTabsHandler
    }
}

