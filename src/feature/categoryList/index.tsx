import { FC } from "react";
import { Box, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useModuleCategory } from "./hooks/useModule.hook";
import { ICategoryStore } from "./store/useCategory.store";
import CategoryListComponent from "./components/CategoryListComponent.component";
import ModalCategoryOrDescriptionComponent from "./components/ModalCategoryOrDescription.component";
import { IUiHook } from "../ui/hooks/useUi.hook";

//TODO: AGREGAR PARA EDITAR Y ELIMINAR UNA CATEGORÍA
//TODO: AGREGAR LA EDICION Y CREACION DE UNA NUEVA DESCRIPCIÖN

interface ICategoryModuleProps {
    categoryStore: ICategoryStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const CategoryListModule: FC<ICategoryModuleProps> = (props) => {

    const moduleHook = useModuleCategory(props)

    return (
        <>

            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Stock</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => moduleHook.onSetIsModal(true)}
                    startIcon={<AddCircleOutlinedIcon />}
                >
                    Nueva Categoria
                </Button>
            </Box>
            <CategoryListComponent data={props.categoryStore.categoryList} onOpenModal={moduleHook.onOpenModalHandler} />

            <ModalCategoryOrDescriptionComponent isOpen={moduleHook.isOpen} modalLabel={moduleHook.addOrUpdateCategory.labelModal} onClose={moduleHook.onCloseModalHandler} onAddOrUpdateCategory={moduleHook.onAddOrUpdateHandler} />
        </>
    );
};
export default CategoryListModule;
