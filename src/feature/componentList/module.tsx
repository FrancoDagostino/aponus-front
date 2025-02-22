import { FC } from 'react'
import TabsCategoryComponentType from '../stockList/components/TabsCategoryType.component';
import { IComponentListStore } from './store/useComponentList.store';
import { IStockStore } from '../stockList/store/useStock.store';
import { useComponentListHook } from './hooks/useModule.hook';
import { IUiHook } from '../ui/hooks/useUi.hook';
import { Box, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { ComponentListTable } from './components/ComponentListTable.component';


interface IComponentListModuleProps {
    componentListStore: IComponentListStore
    stockStore: IStockStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const ComponentListModule: FC<IComponentListModuleProps> = (props) => {

    const moduleHook = useComponentListHook(props)


    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Componentes</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => props.onNavigate('/component-add')}
                    startIcon={<AddCircleOutlinedIcon />}
                >
                    Nuevo Componente
                </Button>
            </Box>
            <TabsCategoryComponentType
                categoryTypeList={props.stockStore.categoryTypeList}
                onChangeTabsHandler={moduleHook.onChangeTabsHandler}
            />

            {/* <ComponentList data={props.componentListStore.componentList} componentEdit={moduleHook.onEditComponentHandler} /> */}
            <ComponentListTable data={props.componentListStore.reportComponentScheme} onEdit={moduleHook.onEditComponentHandler} />
        </>
    )
}