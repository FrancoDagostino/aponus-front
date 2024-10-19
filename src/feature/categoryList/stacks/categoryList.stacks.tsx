import { Route } from "react-router-dom"
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import CategoryListModule from '../index';
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface ICategoryListStackProps {
    categoryStore: ICategoryStore;
    uiHook: IUiHook
}

export const CategoryListStack = (props: ICategoryListStackProps) => [
    <Route
        exact
        key="/category-list"
        path="/category-list"
        render={(route) => (
            <CategoryListModule uiHook={props.uiHook} categoryStore={props.categoryStore} onNavigate={route.history.push} />
        )}
    />,
]
