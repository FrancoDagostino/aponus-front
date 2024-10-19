import { useEffect } from "react";
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentAddStore } from "../store/useComponentAdd.store";
import { IComponentAdd } from "../model/componentAdd.model";

interface IComponentAddModuleProps {
    componentAddStore: IComponentAddStore
    stockStore: IStockStore;
}

interface IComponentAddHook {
    onAddOrUpdateComponentHandler: (newComponent: IComponentAdd, description: string) => void
}

export const useComponentAddHook = (props: IComponentAddModuleProps): IComponentAddHook => {
    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = () => {
        props.stockStore.getStockTypeListAction();
    }

    const onAddOrUpdateComponentHandler = (newComponent: IComponentAdd, description: string) => {
        props.componentAddStore.postCreateComponentAction(newComponent, description);
    }

    return {
        onAddOrUpdateComponentHandler
    }
}
