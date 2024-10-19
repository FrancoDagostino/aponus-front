


import { Route } from "react-router-dom"
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentAddStore } from "../store/useComponentAdd.store";
import { ComponentAddModule } from "../module";



interface IComponentListStackProps {
    componentAddStore: IComponentAddStore
    stockStore: IStockStore;

}

export const ComponentAddStack = (props: IComponentListStackProps) => [
    <Route
        exact
        key="/component-add"
        path="/component-add"
        render={(route) => (
            <ComponentAddModule
                componentAddStore={props.componentAddStore}
                stockStore={props.stockStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
