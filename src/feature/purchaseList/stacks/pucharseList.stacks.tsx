import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { IPurchaseListStore } from "../store/usePurcharseList.store";
import { PurchaseListModule } from "../module";




interface IPucharseListStackProps {
    uiHook: IUiHook
    pucharseListStore: IPurchaseListStore
}

export const PucharseListStack = (props: IPucharseListStackProps) => [
    <Route
        exact
        key="/pucharse-list"
        path="/pucharse-list"
        render={(route) => (
            <PurchaseListModule
                purchaseListStore={props.pucharseListStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
