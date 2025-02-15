import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { ISalesListStore } from "../store/useSalesList.store";
import { SalesListModule } from "../module";





interface ISalesListStackProps {
    uiHook: IUiHook
    salesListStore: ISalesListStore
}

export const SaleListStack = (props: ISalesListStackProps) => [
    <Route
        exact
        key="/sales-list"
        path="/sales-list"
        render={(route) => (
            <SalesListModule
                salesListStore={props.salesListStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
