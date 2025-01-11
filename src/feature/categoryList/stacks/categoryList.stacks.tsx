import { Route } from "react-router-dom"
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import CategoryListModule from '../index';
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface ICategoryListStackProps {
    categoryStore: ICategoryStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
}

export const CategoryListStack = (props: ICategoryListStackProps) => [
    <Route
        exact
        key="/category-list"
        path="/category-list"
        render={(route) => (
            <CategoryListModule permissions={props.permissions} rol={props.rol} uiHook={props.uiHook} categoryStore={props.categoryStore} onNavigate={route.history.push} />
        )}
    />,
]
