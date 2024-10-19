import { IListadoPadre, IStockFormateado } from "../model/product.model";
import { createResultUtil, TResult } from '../../../utils/result.util';
import { IProductListService } from '../services/useProductList.service';
import { useState } from "react";
import { componentProductMapper } from "../mappers/componentProduct";

export interface IProductListStore {
    productList: IListadoPadre[];
    componentList: IStockFormateado[];
    getProductListAction: (idType: string) => Promise<TResult<null, null>>;
    getProductListForTypeAndDescriptionAction: (idType: string, idDescription: string) => Promise<TResult<null, null>>;
    postProductComponentAction: (idProduct: string, quantity: number) => Promise<TResult<IStockFormateado[], null>>;
}

export interface IProductListStoreProps {
    productListService: IProductListService
}

export const useProductListStore = (props: IProductListStoreProps): IProductListStore => {
    const [productList, setProductList] = useState<IListadoPadre[]>([]);

    const [componentList, setComponentList] = useState<IStockFormateado[]>([]);

    const getProductListAction: IProductListStore["getProductListAction"] = async (idType: string) => {
        const result = await props.productListService.getProductList(idType)
        console.log(result)
        if (result.isError) return createResultUtil.error(null)
        setProductList(result.data)
        return createResultUtil.success(null)
    }

    const getProductListForTypeAndDescriptionAction: IProductListStore["getProductListForTypeAndDescriptionAction"] = async (idType: string, idDescription: string) => {

        const result = await props.productListService.getProductListForTypeAndDescription(idType, idDescription)
        if (result.isError) return createResultUtil.error(null)
        setProductList(result.data)
        return createResultUtil.success(null)
    }

    const postProductComponentAction: IProductListStore["postProductComponentAction"] = async (idProduct: string, quantity: number) => {
        const result = await props.productListService.postProductComponent(idProduct, quantity)
        if (result.isError) return createResultUtil.error(null)

        setComponentList(componentProductMapper(result.data))
        return createResultUtil.success(componentProductMapper(result.data))
    }

    return {
        componentList,
        productList,
        getProductListAction,
        getProductListForTypeAndDescriptionAction,
        postProductComponentAction,
    }
}