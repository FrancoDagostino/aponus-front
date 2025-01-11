import { Route } from "react-router-dom"
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IProductListStore } from "../store/useProductList.store";
import { ProductListModule } from "../module";



interface IProductListStackProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
    permissions: string[]
    rol: string
}

export const ProductListStack = (props: IProductListStackProps) => [
    <Route
        exact
        key="/product-list"
        path="/product-list"
        render={(route) => (
            <ProductListModule
                permissions={props.permissions}
                rol={props.rol}
                productListStore={props.productListStore}
                categoryStore={props.categoryStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
