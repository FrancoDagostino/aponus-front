import { Route } from "react-router-dom"
import { ComponentListModule } from "../module";
import { IComponentListStore } from "../store/useComponentList.store";
import { IStockStore } from "../../stockList/store/useStock.store";



interface IComponentListStackProps {
    componentListStore: IComponentListStore
    stockStore: IStockStore;
    permissions: string[]
    rol: string
}

export const ComponentListStack = (props: IComponentListStackProps) => [
    <Route
        exact
        key="/component-list"
        path="/component-list"
        render={(route) => (
            <ComponentListModule
                permissions={props.permissions}
                rol={props.rol}
                componentListStore={props.componentListStore}
                stockStore={props.stockStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
