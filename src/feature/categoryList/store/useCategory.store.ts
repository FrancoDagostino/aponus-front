import { IListadoCategorias, IListadoDescripciones } from "../model/category.model";
import { ICategoryService } from "../services/useCategory.service"
import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";


export interface ICategoryStore {
    categoryList: IListadoCategorias[];
    descriptionList: IListadoDescripciones[];
    getCategoryListAction: () => Promise<TResult<null, null>>;
    getDescriptionListAction: (idType: string) => Promise<TResult<IListadoDescripciones[], null>>;
    addDescriptionAction: (description: string, idType: string) => Promise<TResult<null, null>>;
    addCategoryAction: (category: string, idType: string) => Promise<TResult<null, null>>;
    updateDescriptionAction: (idDescription: number, description: string) => Promise<TResult<null, null>>;
}


export interface ICategoryStoreProps {
    categoryService: ICategoryService
}

export const useCategoryStore = (props: ICategoryStoreProps): ICategoryStore => {
    const [categoryList, setCategoryList] = useState<IListadoCategorias[]>([]);

    const [descriptionList, setDescriptionList] = useState<IListadoDescripciones[]>([]);


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

    return {
        categoryList,
        descriptionList,
        addCategoryAction,
        addDescriptionAction,
        getCategoryListAction,
        getDescriptionListAction,
        updateDescriptionAction,
    }
}