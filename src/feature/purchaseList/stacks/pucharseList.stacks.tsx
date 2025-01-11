import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { IPurchaseListStore } from "../store/usePurcharseList.store";
import { PurchaseListModule } from "../module";




interface IPucharseListStackProps {
    uiHook: IUiHook
    pucharseListStore: IPurchaseListStore
    permissions: string[]
    rol: string
}

export const PucharseListStack = (props: IPucharseListStackProps) => [
    <Route
        exact
        key="/pucharse-list"
        path="/pucharse-list"
        render={(route) => (
            <PurchaseListModule
                permissions={props.permissions}
                rol={props.rol}
                purchaseListStore={props.pucharseListStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
