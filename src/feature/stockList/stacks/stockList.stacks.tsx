import { Route } from "react-router-dom"
import { StockListModule } from '../index';
import { IStockStore } from "../store/useStock.store";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";



interface ICategoryListStackProps {
    stockStore: IStockStore;
    categoryStore: ICategoryStore;
    permissions: string[]
    rol: string
}

export const StockListStack = (props: ICategoryListStackProps) => [
    <Route
        exact
        key="/stock-list"
        path="/stock-list"
        render={(route) => (
            <StockListModule permissions={props.permissions} rol={props.rol} categoryStore={props.categoryStore} stockStore={props.stockStore} onNavigate={route.history.push} />
        )}
    />,
]
