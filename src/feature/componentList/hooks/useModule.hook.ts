import { useEffect, useState } from "react";
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentListStore } from "../store/useComponentList.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";


interface IComponentListModuleProps {
    componentListStore: IComponentListStore
    stockStore: IStockStore;
    uiHook: IUiHook
    onNavigate: (url: string) => void;
}

interface IComponentListHook {
    idDescriptionFounded: string
    onChangeTabsHandler: (idDescription: string) => Promise<void>
    onEditComponentHandler: (idDescription: number, idInsumo: string) => void
}

export const useComponentListHook = (props: IComponentListModuleProps): IComponentListHook => {

    const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");


    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = async () => {
        props.uiHook.showLoading()
        await props.stockStore.getStockTypeListAction();
        props.uiHook.hideLoading()
    }

    const onChangeTabsHandler = async (idDescription: string) => {
        props.uiHook.showLoading()
        setIdDescriptionFounded(idDescription);
        await props.componentListStore.getComponentListAction(Number(idDescription));
        props.uiHook.hideLoading()
    };

    const onEditComponentHandler = (idDescription: number, idInsumo: string) => {
        props.onNavigate(`/component-add/${idDescription}*${idInsumo}`)
    }
    return {
        idDescriptionFounded,
        onChangeTabsHandler,
        onEditComponentHandler
    }
}