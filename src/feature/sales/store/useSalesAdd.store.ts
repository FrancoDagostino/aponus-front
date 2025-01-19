import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { ICompraPost, ISalesAddService } from "../service/useSalesAdd.service";
import { IBilling, IProduct } from "../model/sales.model";

export interface ISalesAddStoreProps {
    useSalesAddService: ISalesAddService
}


export interface ISalesAddStore {
    billingList: IBilling[]
    productList: IProduct[]
    createSalesAction: (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => Promise<TResult<null, null>>
    billingListAction: () => Promise<TResult<null, null>>
    productListAction: () => Promise<TResult<null, null>>
}


export const useSalesAddStore = (props: ISalesAddStoreProps): ISalesAddStore => {


    const [billingList, setBillingList] = useState<IBilling[]>([])

    const [productList, setProductList] = useState<IProduct[]>([])

    const createSalesAction = async (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => {
        const result = await props.useSalesAddService.createPurchase(inputData, receivedMerchandise, files)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }


    const billingListAction = async () => {
        const result = await props.useSalesAddService.billingList()
        if (result.isError) return createResultUtil.error(null)
        setBillingList(result.data)
        return createResultUtil.success(null)
    }

    const productListAction = async () => {
        const result = await props.useSalesAddService.productList();
        if (result.isError) return createResultUtil.error(null);
        setProductList(result.data)
        return createResultUtil.success(null)
    }


    return {
        billingList,
        productList,
        createSalesAction,
        billingListAction,
        productListAction
    }


}