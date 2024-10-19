import { Route } from "react-router-dom"
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IProductListStore } from "../store/useProductList.store";
import { ProductListModule } from "../module";



interface IProductListStackProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
}

export const ProductListStack = (props: IProductListStackProps) => [
    <Route
        exact
        key="/product-list"
        path="/product-list"
        render={(route) => (
            <ProductListModule
                productListStore={props.productListStore}
                categoryStore={props.categoryStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
