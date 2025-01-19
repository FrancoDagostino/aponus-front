


import { Route } from "react-router-dom"
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentAddStore } from "../store/useComponentAdd.store";
import { ComponentAddModule } from "../module";
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface IComponentListStackProps {
    componentAddStore: IComponentAddStore
    uiHook: IUiHook
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
                uiHook={props.uiHook}
                idInsumo=""
                permissions={props.permissions}
                rol={props.rol}
                componentAddStore={props.componentAddStore}
                stockStore={props.stockStore}
                onNavigate={route.history.push}
            />
        )}
    />,

    <Route
        exact
        key="/component-add/:idInsumo"
        path="/component-add/:idInsumo"
        render={(route) => (
            <ComponentAddModule
                uiHook={props.uiHook}
                idInsumo={route.match.params.idInsumo}
                permissions={props.permissions}
                rol={props.rol}
                componentAddStore={props.componentAddStore}
                stockStore={props.stockStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
