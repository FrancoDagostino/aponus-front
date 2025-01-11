import { FC, useEffect, useState } from 'react'
import FormComponentAdd from './components/FormComponentAdd.component';
import { IComponentAddStore } from './store/useComponentAdd.store';
import { IStockStore } from '../stockList/store/useStock.store';
import { useComponentAddHook } from './hooks/useModule.hook';
import LoaderComponent from '../../components/Loader/Loader.component';
import { UnAuthorizedModule } from '../unAuthorized/module';

interface IComponentAddModuleProps {
    componentAddStore: IComponentAddStore
    stockStore: IStockStore
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void
}

export const ComponentAddModule: FC<IComponentAddModuleProps> = (props) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }

    const useModule = useComponentAddHook(props)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])


    return (
        <>
            <LoaderComponent isOpen={isLoading} />
            <h1>Nuevo Componente</h1>
            <FormComponentAdd componentTypes={props.stockStore.categoryTypeList} onSave={useModule.onAddOrUpdateComponentHandler} />
        </>
    )
}

