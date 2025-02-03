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

interface ICategoryModule {
    isOpen: boolean
    addOrUpdateCategory: IAddOrUpdateCategory
    onOpenModalHandler: (labelModal: string, idCategory: string) => void
    onCloseModalHandler: () => void
    onAddOrUpdateHandler: (category: string) => Promise<void>
    onSetIsModal: (isOpen: boolean) => void
    onRemoveIdTypeCategoryHandler: (idType: string) => Promise<void>
}
export const useModuleCategory = (props: ICategoryModuleProps): ICategoryModule => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
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
    const onCloseModalHandler = () => {
        setIsOpen(false);
        setAddOrUpdateCategory({
            category: '',
            labelModal: 'Nueva Categoría',
            idCategory: ''
        })
    };

    const onAddOrUpdateHandler = async (category: string) => {
        console.log('se llamo')
        setIsOpen(false)
        props.uiHook.showLoading()
        await props.categoryStore.addCategoryAction(category, addOrUpdateCategory.idCategory);
        await props.categoryStore.getCategoryListAction()
        props.uiHook.hideLoading()
    }

    const onRemoveIdTypeCategoryHandler = async (idType: string) => {
        props.uiHook.showLoading()
        await props.categoryStore.deleteCategoryTypeAction(idType)
        props.uiHook.hideLoading()
    }


    return {
        addOrUpdateCategory,
        isOpen,
        onAddOrUpdateHandler,
        onCloseModalHandler,
        onOpenModalHandler,
        onSetIsModal,
        onRemoveIdTypeCategoryHandler
    }
}