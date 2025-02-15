import { useState } from "react"
import { ISale } from "../model/salesList.model"
import { ISalesListService } from "../service/useSalesList.service"
import { createResultUtil, TResult } from "../../../utils/result.util"


export interface ISalesListStore {
    salesList: ISale[]
    getSalesListAction: () => Promise<TResult<null, null>>
}

export interface ISalesListStoreProps {
    salesListService: ISalesListService
}

export const useSalesListStore = (props: ISalesListStoreProps): ISalesListStore => {
    const [salesList, setSalesList] = useState<ISale[]>([])

    const getSalesListAction = async () => {
        const result = await props.salesListService.getSalesList()
        if (result.isError) return createResultUtil.error(result.data)
        setSalesList(result.data)
        return createResultUtil.success(null)
    }

    return {
        salesList,
        getSalesListAction
    }
}