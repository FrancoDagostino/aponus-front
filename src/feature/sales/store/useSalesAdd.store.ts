import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { IQuotation, ISalesAddService, IVentaPost } from "../service/useSalesAdd.service";
import { IBilling, IProduct, IQuatationList } from "../model/sales.model";

export interface ISalesAddStoreProps {
    useSalesAddService: ISalesAddService
}


export interface ISalesAddStore {
    billingList: IBilling[]
    productList: IProduct[]
    quatationList: IQuatationList[]
    createSalesAction: (inputData: IVentaPost, files: File[]) => Promise<TResult<null, null>>
    billingListAction: () => Promise<TResult<null, null>>
    productListAction: () => Promise<TResult<null, null>>
    getQuotationAction: (inputData: IQuotation) => Promise<TResult<null, null>>
}


export const useSalesAddStore = (props: ISalesAddStoreProps): ISalesAddStore => {


    const [billingList, setBillingList] = useState<IBilling[]>([])

    const [productList, setProductList] = useState<IProduct[]>([])

    const [quatationList, setQuatationList] = useState<IQuatationList[]>([])

    const createSalesAction = async (inputData: IVentaPost, files: File[]) => {
        const result = await props.useSalesAddService.createPurchase(inputData, files)
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
        setQuatationList([])
        return createResultUtil.success(null)
    }

    const getQuotationAction = async (inputData: IQuotation) => {
        const result = await props.useSalesAddService.getQuotation(inputData)
        if (result.isError) return createResultUtil.error(null)
        setQuatationList(result.data)
        return createResultUtil.success(null)
    }


    return {
        billingList,
        productList,
        quatationList,
        createSalesAction,
        billingListAction,
        productListAction,
        getQuotationAction
    }


}