import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { IPurchaseListService } from "../services/usePurcharseList.service";
import { IPucharse } from "../model/pucharseList.model";

export interface IPurchaseListStoreProps {
    usePurchaseListService: IPurchaseListService
}


export interface IPurchaseListStore {
    purchaseListState: IPucharse[]
    getPurchaseListAction: () => Promise<TResult<null, null>>
}


export const usePurchaseListStore = (props: IPurchaseListStoreProps): IPurchaseListStore => {

    const [purchaseListState, setPurchaseListState] = useState<IPucharse[]>([])

    const getPurchaseListAction = async () => {
        const result = await props.usePurchaseListService.getPurchaseList()
        if (result.isError) return createResultUtil.error(null)
        setPurchaseListState(result.data)
        return createResultUtil.success(null)
    }


    return {
        purchaseListState,
        getPurchaseListAction
    }


}