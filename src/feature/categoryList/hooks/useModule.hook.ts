import { useEffect, useState } from "react";
import { ICategoryStore } from "../store/useCategory.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";


interface ICategoryModuleProps {
    categoryStore: ICategoryStore;
    uiHook: IUiHook
    onNavigate: (url: string) => void;
}

interface IAddOrUpdateCategory {
    labelModal: string;
    idCategory: string;
    category: string
}

interface IAddOrUpdateComponent {
    labelModal: string;
    idDescription: string;
    component: string
}

interface ICategoryModule {
    isOpen: boolean
    addOrUpdateCategory: IAddOrUpdateCategory
    onOpenModalHandler: (labelModal: string, idCategory: string) => void
    onCloseModalHandler: () => void
    onAddOrUpdateHandler: (category: string) => Promise<void>
    onSetIsModal: (isOpen: boolean) => void
    onRemoveIdTypeCategoryHandler: (idType: string) => Promise<void>
    onRemoveComponentHandler: (idAlmacenamiento: string) => Promise<void>
    isOpenComponent: boolean
    addOrUpdateComponent: IAddOrUpdateComponent
    onOpenModalComponentHandler: (labelModal: string, idComponent: string) => void
    onAddOrUpdateComponentHandler: (component: string) => Promise<void>
    onCloseModalComponentHandler: () => void
}
export const useModuleCategory = (props: ICategoryModuleProps): ICategoryModule => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenComponent, setIsOpenComponent] = useState<boolean>(false);
    const [addOrUpdateComponent, setAddOrUpdateComponent] = useState<IAddOrUpdateComponent>({
        idDescription: '0',
        labelModal: 'Nueva Componente',
        component: ''
    })
    const [addOrUpdateCategory, setAddOrUpdateCategory] = useState<IAddOrUpdateCategory>({
        idCategory: '',
        labelModal: 'Nueva Categoría',
        category: ''
    })

    useEffect(() => {
        onInitHandler();
    }, []);

    const onInitHandler = () => {
        props.uiHook.showLoading()
        props.categoryStore.getCategoryListAction();
        props.categoryStore.getComponentListAction();
        props.uiHook.hideLoading()

    };

    const onSetIsModal = (isOpen: boolean) => {
        setIsOpen(isOpen)
    }

    const onOpenModalHandler = (labelModal: string, idCategory: string) => {
        setAddOrUpdateCategory({
            ...addOrUpdateCategory,
            labelModal,
            idCategory
        })
        setIsOpen(true)
    }

    const onOpenModalComponentHandler = (labelModal: string, idComponent: string) => {
        setAddOrUpdateComponent({
            ...addOrUpdateComponent,
            labelModal,
            idDescription: idComponent === "" ? "0" : idComponent
        })
        setIsOpenComponent(true)
    }

    const onCloseModalHandler = () => {
        setIsOpen(false);
        setAddOrUpdateCategory({
            category: '',
            labelModal: 'Nueva Categoría',
            idCategory: ''
        })
    };

    const onCloseModalComponentHandler = () => {
        setIsOpenComponent(false)
        setAddOrUpdateComponent({
            component: '',
            labelModal: 'Nueva Componente',
            idDescription: ''
        })
    }

    const onAddOrUpdateHandler = async (category: string) => {
        setIsOpen(false)
        props.uiHook.showLoading()
        const result = await props.categoryStore.addCategoryAction(category, addOrUpdateCategory.idCategory);
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al agregar la categoría",
                type: "alert",
            })
            return
        }
        props.uiHook.showLoading()
        const resultCategory = await props.categoryStore.getCategoryListAction()
        props.uiHook.hideLoading()
        if (resultCategory.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al obtener la lista de categorías",
                type: "alert",
            })
            return
        }
        props.uiHook.onSetSnackbar("Categoría agregada correctamente", true)
    }

    const onRemoveIdTypeCategoryHandler = async (idType: string) => {
        props.uiHook.showLoading()
        const result = await props.categoryStore.deleteCategoryTypeAction(idType)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar la categoría",
                type: "alert",
            })
            return
        }
        props.uiHook.onSetSnackbar("Categoría eliminada correctamente", true)
    }

    const onRemoveComponentHandler = async (idAlmacenamiento: string) => {
        props.uiHook.showLoading()
        const result = await props.categoryStore.deleteComponentAction(idAlmacenamiento)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar la componente",
                type: "alert",
            })
            return
        }
        props.uiHook.onSetSnackbar("Componente eliminado correctamente", true)
    }

    const onAddOrUpdateComponentHandler = async (component: string) => {
        setIsOpenComponent(false)
        props.uiHook.showLoading()
        const result = await props.categoryStore.addComponentAction(component, addOrUpdateComponent.idDescription)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al agregar la componente",
                type: "alert",
            })
            return
        }
        props.uiHook.onSetSnackbar("Componente agregado correctamente", true)
    }


    return {
        addOrUpdateCategory,
        isOpen,
        onAddOrUpdateHandler,
        onCloseModalHandler,
        onOpenModalHandler,
        onSetIsModal,
        onRemoveIdTypeCategoryHandler,
        onRemoveComponentHandler,
        isOpenComponent,
        addOrUpdateComponent,
        onOpenModalComponentHandler,
        onAddOrUpdateComponentHandler,
        onCloseModalComponentHandler
    }
}