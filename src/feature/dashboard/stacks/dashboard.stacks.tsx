import { Route } from "react-router-dom"
import { DashboardModule } from "../index";
import { IDashboardStore } from "../store/useDashboard.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";




interface IDashboardStackProps {
    dashboardStore: IDashboardStore;
    uiHook: IUiHook
}

export const DashboardStack = (props: IDashboardStackProps) => [
    <Route
        exact
        key="/dashboard"
        path="/dashboard"
        render={(route) => (
            <DashboardModule
                dashboardStore={props.dashboardStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
