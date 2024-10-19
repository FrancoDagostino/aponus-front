import { FC } from 'react'
import ComponentList from './components/ComponentList.component';
import TabsCategoryComponentType from '../stockList/components/TabsCategoryType.component';
import { IComponentListStore } from './store/useComponentList.store';
import { IStockStore } from '../stockList/store/useStock.store';
import { useComponentListHook } from './hooks/useModule.hook';


interface IComponentListModuleProps {
    componentListStore: IComponentListStore
    stockStore: IStockStore;
    onNavigate: (url: string) => void;
}

export const ComponentListModule: FC<IComponentListModuleProps> = (props) => {

    const moduleHook = useComponentListHook(props)


    return (
        <>
            <h1>Listado de Componentes</h1>
            <TabsCategoryComponentType
                categoryTypeList={props.stockStore.categoryTypeList}
                onChangeTabsHandler={moduleHook.onChangeTabsHandler}
            />

            <ComponentList data={props.componentListStore.componentList} />
        </>
    )
}