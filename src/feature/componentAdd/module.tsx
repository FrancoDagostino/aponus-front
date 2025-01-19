import { FC } from 'react'
import FormComponentAdd from './components/FormComponentAdd.component';
import { IComponentAddStore } from './store/useComponentAdd.store';
import { IStockStore } from '../stockList/store/useStock.store';
import { useComponentAddHook } from './hooks/useModule.hook';
import { IUiHook } from '../ui/hooks/useUi.hook';

interface IComponentAddModuleProps {
    componentAddStore: IComponentAddStore
    uiHook: IUiHook
    idInsumo: string
    stockStore: IStockStore
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void
}

export const ComponentAddModule: FC<IComponentAddModuleProps> = (props) => {



    const useModule = useComponentAddHook(props)

    return (
        <>
            <h1>Nuevo Componente</h1>
            <FormComponentAdd isEdit={useModule.isEdit} componentTypes={props.stockStore.categoryTypeList}
                onAddOrUpdateComponentHandler={useModule.onAddOrUpdateComponentHandler}
                componentForm={useModule.componentForm} description={useModule.description} onChangeComponentFormHandler={useModule.onChangeComponentFormHandler}
            />
        </>
    )
}

