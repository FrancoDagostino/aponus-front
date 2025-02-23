import { IComponentDescription, IListadoCategorias, IListadoDescripciones } from "../model/category.model";
import { ICategoryService } from "../services/useCategory.service"
import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";


export interface ICategoryStore {
    categoryList: IListadoCategorias[];
    descriptionList: IListadoDescripciones[];
    componentList: IComponentDescription[]
    getCategoryListAction: () => Promise<TResult<null, null>>;
    getDescriptionListAction: (idType: string) => Promise<TResult<IListadoDescripciones[], null>>;
    addDescriptionAction: (description: string, idType: string) => Promise<TResult<null, null>>;
    addCategoryAction: (category: string, idType: string) => Promise<TResult<null, null>>;
    updateDescriptionAction: (idDescription: number, description: string) => Promise<TResult<null, null>>;
    deleteCategoryTypeAction: (idType: string) => Promise<TResult<null, null>>
    deleteComponentAction: (idAlmacenamiento: string) => Promise<TResult<null, null>>;
    getComponentListAction: () => Promise<TResult<null, null>>;
    addComponentAction: (description: string, idType: string, storage: string, fraction: string) => Promise<TResult<null, null>>;
}


export interface ICategoryStoreProps {
    categoryService: ICategoryService
}

export const useCategoryStore = (props: ICategoryStoreProps): ICategoryStore => {
    const [categoryList, setCategoryList] = useState<IListadoCategorias[]>([]);

    const [descriptionList, setDescriptionList] = useState<IListadoDescripciones[]>([]);

    const [componentList, setComponentList] = useState<IComponentDescription[]>([]);



    const addComponentAction: ICategoryStore["addComponentAction"] = async (description: string, idType: string, storage: string, fraction: string) => {
        const result = await props.categoryService.addComponent(description, idType, storage, fraction)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const getComponentListAction: ICategoryStore["getComponentListAction"] = async () => {
        const result = await props.categoryService.getComponentList()
        if (result.isError) return createResultUtil.error(result.data)
        setComponentList(result.data)
        return createResultUtil.success(null)
    }

    const deleteComponentAction: ICategoryStore["deleteComponentAction"] = async (idAlmacenamiento: string) => {
        const result = await props.categoryService.deleteComponent(idAlmacenamiento)
        if (result.isError) return createResultUtil.error(result.data)
        setComponentList(componentList.filter(component => component.idAlmacenamiento !== idAlmacenamiento))
        return createResultUtil.success(null)
    }


    const getCategoryListAction: ICategoryStore["getCategoryListAction"] = async () => {

        const result = await props.categoryService.getCategoryList()
        if (result.isError) return createResultUtil.error(result.data)
        setCategoryList(result.data)
        return createResultUtil.success(null)
    }

    const getDescriptionListAction: ICategoryStore["getDescriptionListAction"] = async (idType: string) => {
        const result = await props.categoryService.getDescriptionList(idType)
        if (result.isError) return createResultUtil.error(result.data)
        setDescriptionList(result.data)
        return createResultUtil.success(result.data)
    }

    const addDescriptionAction: ICategoryStore["addDescriptionAction"] = async (description: string, idType: string) => {
        const result = await props.categoryService.addDescription(description, idType)
        setCategoryList(categoryList.map(category => {
            return {
                descripcionTipo: category.descripcionTipo,
                idTipo: category.idTipo,
                productos: [Math.random()]
            }
        }))
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const addCategoryAction: ICategoryStore["addCategoryAction"] = async (category: string, idType: string) => {

        const result = await props.categoryService.addCategory(category, idType)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const updateDescriptionAction: ICategoryStore["updateDescriptionAction"] = async (idDescription: number, description: string) => {

        const result = await props.categoryService.updateDescription(idDescription, description)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const deleteCategoryTypeAction: ICategoryStore["deleteCategoryTypeAction"] = async (idType: string) => {
        const result = await props.categoryService.deleteCategoryType(idType);
        if (result.isError) return createResultUtil.error(null);
        setCategoryList(categoryList.filter(category => category.idTipo !== idType))
        return createResultUtil.success(null)
    }

    return {
        categoryList,
        descriptionList,
        componentList,
        addCategoryAction,
        addDescriptionAction,
        getCategoryListAction,
        getDescriptionListAction,
        updateDescriptionAction,
        deleteCategoryTypeAction,
        getComponentListAction,
        deleteComponentAction,
        addComponentAction
    }
}