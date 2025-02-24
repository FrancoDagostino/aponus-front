import { FC, useState } from "react";
import { Box, Button, Tabs, Tab } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useModuleCategory } from "./hooks/useModule.hook";
import { ICategoryStore } from "./store/useCategory.store";
import CategoryListComponent from "./components/CategoryListComponent.component";
import ModalCategoryOrDescriptionComponent from "./components/ModalCategoryOrDescription.component";
import { IUiHook } from "../ui/hooks/useUi.hook";
import ComponentList from "./components/ComponentList";
import ModalComponentDescriptionComponent from "./components/ModalComponentDescription";

interface ICategoryModuleProps {
    categoryStore: ICategoryStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const CategoryListModule: FC<ICategoryModuleProps> = (props) => {
    const moduleHook = useModuleCategory(props)
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Productos" />
                    <Tab label="Componentes" />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h1>Categorias de Productos</h1>
                        <Button
                            sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                            variant="contained"
                            onClick={() => moduleHook.onSetIsModal(true)}
                            startIcon={<AddCircleOutlinedIcon />}
                        >
                            Nueva Categoria
                        </Button>
                    </Box>

                    <CategoryListComponent
                        onDelete={moduleHook.onRemoveIdTypeCategoryHandler}
                        data={props.categoryStore.categoryList}
                        onOpenModal={moduleHook.onOpenModalHandler}
                    />
                </>
            )}

            {tabValue === 1 && (
                <Box>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h1>Descripciones de Componentes</h1>
                        <Button
                            sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                            variant="contained"
                            onClick={() => moduleHook.onOpenModalComponentHandler('Nueva Componente', '')}
                        >
                            Nueva Componente
                        </Button>
                    </Box>
                    <ComponentList
                        onDelete={moduleHook.onRemoveIdTypeCategoryHandler}
                        data={props.categoryStore.componentList}
                        onOpenModal={moduleHook.onOpenModalComponentHandler}
                    />
                </Box>
            )}

            <ModalCategoryOrDescriptionComponent
                isOpen={moduleHook.isOpen}
                modalLabel={moduleHook.addOrUpdateCategory.labelModal}
                onClose={moduleHook.onCloseModalHandler}
                onAddOrUpdateCategory={moduleHook.onAddOrUpdateHandler}
            />
            <ModalComponentDescriptionComponent
                isOpen={moduleHook.isOpenComponent}
                modalLabel={moduleHook.addOrUpdateComponent.labelModal}
                onClose={moduleHook.onCloseModalComponentHandler}
                onAddOrUpdateComponent={moduleHook.onAddOrUpdateComponentHandler}
            />
        </>
    );
};
export default CategoryListModule;
