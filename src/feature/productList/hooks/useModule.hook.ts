import { useEffect } from "react";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IProductListStore } from "../store/useProductList.store";

interface IModuleProductListHookProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
    onNavigate: (url: string) => void;
}

interface IModuleProductList {
    onSelectCategoryTypeHandler: (idType: string) => Promise<void>
    onSelectDescriptionTypeHandler: (idType: string, idDescription: string) => Promise<void>
}

export const useModuleProductListHook = (props: IModuleProductListHookProps): IModuleProductList => {

    const onInitHandler = () => {
        props.categoryStore.getCategoryListAction();
    };

    useEffect(() => {
        onInitHandler();
    }, []);

    const onSelectCategoryTypeHandler = async (idType: string) => {
        await props.categoryStore.getDescriptionListAction(idType);
        await props.productListStore.getProductListAction(idType);
    };

    const onSelectDescriptionTypeHandler = async (idType: string, idDescription: string) => {
        await props.productListStore.getProductListForTypeAndDescriptionAction(
            idType,
            idDescription
        );
    };

    return {
        onSelectCategoryTypeHandler,
        onSelectDescriptionTypeHandler
    }
}