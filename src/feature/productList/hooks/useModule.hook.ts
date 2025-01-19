import { useEffect } from 'react';
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IProductListStore } from "../store/useProductList.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";

interface IModuleProductListHookProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
    uiHook: IUiHook
    onNavigate: (url: string) => void;
}

interface IModuleProductList {
    onSelectCategoryTypeHandler: (idType: string) => Promise<void>
    onEditProductHandler: (idProduct: string) => void
    onSelectDescriptionTypeHandler: (idType: string, idDescription: string) => Promise<void>
}

export const useModuleProductListHook = (props: IModuleProductListHookProps): IModuleProductList => {
    useEffect(() => {
        onInitHandler();
    }, []);

    const onInitHandler = async () => {
        props.uiHook.showLoading()
        await props.categoryStore.getCategoryListAction();
        props.uiHook.hideLoading()
    };

    const onSelectCategoryTypeHandler = async (idType: string) => {
        props.uiHook.showLoading()
        await props.categoryStore.getDescriptionListAction(idType);
        await props.productListStore.getProductListAction(idType);
        props.uiHook.hideLoading()
    };

    const onSelectDescriptionTypeHandler = async (idType: string, idDescription: string) => {
        props.uiHook.showLoading()
        await props.productListStore.getProductListForTypeAndDescriptionAction(
            idType,
            idDescription
        );
        props.uiHook.hideLoading()
    };

    const onEditProductHandler = (idProduct: string) => {
        props.onNavigate(`/product-add/${idProduct}`)
    }


    return {
        onSelectCategoryTypeHandler,
        onSelectDescriptionTypeHandler,
        onEditProductHandler
    }
}