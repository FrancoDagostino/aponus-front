import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { IPurchaseListService } from "../services/usePurcharseList.service";
import { ICompras } from "../../entityList/model/EntityList.model";

export interface IPurchaseListStoreProps {
    usePurchaseListService: IPurchaseListService
}


export interface IPurchaseListStore {
    purchaseListState: ICompras[]
    getPurchaseListAction: () => Promise<TResult<null, null>>
}


export const usePurchaseListStore = (props: IPurchaseListStoreProps): IPurchaseListStore => {

    const [purchaseListState, setPurchaseListState] = useState<ICompras[]>([])

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