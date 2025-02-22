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
    removeFileAction: (idCompra: string, hashArchivo: string) => Promise<TResult<null, null>>
    saveFileAction: (idCompra: string, file: File) => Promise<TResult<null, null>>
}


export const usePurchaseListStore = (props: IPurchaseListStoreProps): IPurchaseListStore => {

    const [purchaseListState, setPurchaseListState] = useState<IPucharse[]>([])

    const getPurchaseListAction = async () => {
        const result = await props.usePurchaseListService.getPurchaseList()
        if (result.isError) return createResultUtil.error(null)
        setPurchaseListState(result.data)
        return createResultUtil.success(null)
    }

    const removeFileAction = async (idCompra: string, hashArchivo: string) => {
        const result = await props.usePurchaseListService.removeFile(idCompra, hashArchivo)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const saveFileAction = async (idCompra: string, file: File) => {
        const result = await props.usePurchaseListService.saveFile(idCompra, file)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    return {
        purchaseListState,
        getPurchaseListAction,
        removeFileAction,
        saveFileAction
    }


}