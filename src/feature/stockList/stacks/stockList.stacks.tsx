import { Route } from "react-router-dom"
import { StockListModule } from '../index';
import { IStockStore } from "../store/useStock.store";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface ICategoryListStackProps {
    stockStore: IStockStore;
    categoryStore: ICategoryStore;
    permissions: string[]
    rol: string
    uiHook: IUiHook
}

export const StockListStack = (props: ICategoryListStackProps) => [
    <Route
        exact
        key="/stock-list"
        path="/stock-list"
        render={(route) => (
            <StockListModule
                uiHook={props.uiHook}
                permissions={props.permissions} rol={props.rol} categoryStore={props.categoryStore} stockStore={props.stockStore} onNavigate={route.history.push} />
        )}
    />,
]
