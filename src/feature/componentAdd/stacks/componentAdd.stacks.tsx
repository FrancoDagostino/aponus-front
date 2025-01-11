


import { Route } from "react-router-dom"
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentAddStore } from "../store/useComponentAdd.store";
import { ComponentAddModule } from "../module";



interface IComponentListStackProps {
    componentAddStore: IComponentAddStore
    stockStore: IStockStore;
    permissions: string[]
    rol: string

}

export const ComponentAddStack = (props: IComponentListStackProps) => [
    <Route
        exact
        key="/component-add"
        path="/component-add"
        render={(route) => (
            <ComponentAddModule
                permissions={props.permissions}
                rol={props.rol}
                componentAddStore={props.componentAddStore}
                stockStore={props.stockStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
