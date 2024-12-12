import { createResultUtil, TResult } from "../../../utils/result.util";
import { ICompraPost, IPurchaseAddService } from "../service/usePurchaseAdd.service";

export interface IPurchaseAddStoreProps {
    usePurchaseAddService: IPurchaseAddService
}


export interface IPurchaseAddStore {
    createPurchaseAction: (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => Promise<TResult<null, null>>
}


export const usePurchaseAddStore = (props: IPurchaseAddStoreProps): IPurchaseAddStore => {


    const createPurchaseAction = async (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => {
        const result = await props.usePurchaseAddService.createPurchase(inputData, receivedMerchandise, files)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }


    return {
        createPurchaseAction
    }


}