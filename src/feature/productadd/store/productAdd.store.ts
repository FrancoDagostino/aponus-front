import { useState } from 'react';
import { createResultUtil, TResult } from '../../../utils/result.util';
import { IProduct, IProductDescription, IProductType, IProductWithComponent, IStorageSupplie, ISupplie } from '../model/productAdd.model';
import { IProductAddService } from '../service/useProductAdd.service';
import { IProductPost } from '../hooks/useModule.hook';


export interface IProductAddStore {
    storageSupplie: IStorageSupplie[]
    supplieList: ISupplie[]
    productTypeList: IProductType[]
    productDescription: IProductDescription[]
    getStorageSuppliesAction: () => Promise<TResult<null, null>>
    getSuppliesAction: () => Promise<TResult<null, null>>
    getProductTypeListAction: () => Promise<TResult<null, null>>
    getProductDescriptionListAction: (idType: string) => Promise<TResult<null, null>>
    saveProduct: (inputData: IProductPost) => Promise<TResult<null, null>>
    getProduct: (productId: string) => Promise<TResult<{
        product: IProduct;
        component: IProductWithComponent;
    }, null>>
}

export interface IProductAddStoreProps {
    productAddService: IProductAddService
}

export const useProductAddStore = (props: IProductAddStoreProps): IProductAddStore => {

    const [storageSupplie, setStorageSupplie] = useState<IStorageSupplie[]>([])
    const [supplieList, setSupplieList] = useState<ISupplie[]>([])
    const [productTypeList, setProductTypeList] = useState<IProductType[]>([])
    const [productDescription, setProductDescription] = useState<IProductDescription[]>([])

    const getStorageSuppliesAction: IProductAddStore["getStorageSuppliesAction"] = async () => {
        const result = await props.productAddService.getStorageSupplies()
        if (result.isError) return createResultUtil.error(null)
        setStorageSupplie(result.data)
        return createResultUtil.success(null)
    }

    const getSuppliesAction: IProductAddStore["getSuppliesAction"] = async () => {
        const result = await props.productAddService.getSupplies()
        if (result.isError) return createResultUtil.error(null)
        setSupplieList(result.data)
        return createResultUtil.success(null)
    }

    const getProductTypeListAction: IProductAddStore["getProductTypeListAction"] = async () => {
        const result = await props.productAddService.getProductTypeList()
        if (result.isError) return createResultUtil.error(null)
        setProductTypeList(result.data)
        return createResultUtil.success(null)
    }

    const getProductDescriptionListAction: IProductAddStore["getProductDescriptionListAction"] = async (idType: string) => {
        const result = await props.productAddService.getProductDescriptionList(idType)
        if (result.isError) return createResultUtil.error(null)
        setProductDescription(result.data)
        return createResultUtil.success(null)
    }

    const saveProduct: IProductAddStore["saveProduct"] = async (inputData: IProductPost) => {
        const result = await props.productAddService.saveProduct(inputData);
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const getProduct: IProductAddStore["getProduct"] = async (productId: string) => {
        const resultProduct = await props.productAddService.getProduct(productId);
        if (resultProduct.isError) return createResultUtil.error(null)

        const resultComponent = await props.productAddService.getComponent(productId)
        if (resultComponent.isError) return createResultUtil.error(null)

        const objProduct = {
            product: resultProduct.data,
            component: resultComponent.data

        }
        return createResultUtil.success(objProduct)
    }

    return {
        storageSupplie,
        supplieList,
        productTypeList,
        productDescription,
        getStorageSuppliesAction,
        getSuppliesAction,
        getProductTypeListAction,
        getProductDescriptionListAction,
        saveProduct,
        getProduct
    }
}