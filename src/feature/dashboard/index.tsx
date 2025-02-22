import { IUiHook } from "../ui/hooks/useUi.hook"
import { IDashboardStore } from "./store/useDashboard.store"
import { FC } from "react"
import { useDashboardHook } from "./hooks/useDashboard.hook"
interface IDashboardModuleProps {
    dashboardStore: IDashboardStore
    uiHook: IUiHook
    onNavigate: (path: string) => void
}


export const DashboardModule: FC<IDashboardModuleProps> = (props) => {
    const useModule = useDashboardHook({
        dashboardStore: props.dashboardStore,
        uiHook: props.uiHook
    })
    useModule
    return (
        <h1>Dashboard</h1>
    )
}


