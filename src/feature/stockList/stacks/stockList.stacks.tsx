import { Route } from "react-router-dom"
import { StockListModule } from '../index';
import { IStockStore } from "../store/useStock.store";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";



interface ICategoryListStackProps {
    stockStore: IStockStore;
    categoryStore: ICategoryStore;
}

export const StockListStack = (props: ICategoryListStackProps) => [
    <Route
        exact
        key="/stock-list"
        path="/stock-list"
        render={(route) => (
            <StockListModule categoryStore={props.categoryStore} stockStore={props.stockStore} onNavigate={route.history.push} />
        )}
    />,
]
