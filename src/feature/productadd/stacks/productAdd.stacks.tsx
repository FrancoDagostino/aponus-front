import { Route } from "react-router-dom"
import { ProductAddModule } from '../module';
import { IProductAddStore } from "../store/productAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface IProductAddStackProps {
    productAddStore: IProductAddStore;
    uiHook: IUiHook;
    permissions: string[]
    rol: string
}

export const ProductAddStack = (props: IProductAddStackProps) => [
    <Route
        exact
        key="/product-add"
        path="/product-add"
        render={(route) => (
            <ProductAddModule permissions={props.permissions} rol={props.rol} productId="0" onNavigate={route.history.push} uiHook={props.uiHook} productAddStore={props.productAddStore} />
        )}
    />,
    <Route
        exact
        key="/product-add/:productId"
        path="/product-add/:productId"
        render={(route) => (
            <ProductAddModule permissions={props.permissions} rol={props.rol} productId={route.match.params.productId} onNavigate={route.history.push} uiHook={props.uiHook} productAddStore={props.productAddStore} />
        )}
    />,
]
