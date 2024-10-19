import { useEffect, useState } from "react";
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentListStore } from "../store/useComponentList.store";


interface IComponentListModuleProps {
    componentListStore: IComponentListStore
    stockStore: IStockStore;
}

interface IComponentListHook {
    idDescriptionFounded: string
    onChangeTabsHandler: (idDescription: string) => Promise<void>
}

export const useComponentListHook = (props: IComponentListModuleProps): IComponentListHook => {

    const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");


    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = () => {
        props.stockStore.getStockTypeListAction();
    }

    const onChangeTabsHandler = async (idDescription: string) => {
        setIdDescriptionFounded(idDescription);
        await props.componentListStore.getComponentListAction(Number(idDescription));
    };


    return {
        idDescriptionFounded,
        onChangeTabsHandler
    }
}