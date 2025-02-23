import { useState } from "react"
import { ISale } from "../model/salesList.model"
import { ISalesListService } from "../service/useSalesList.service"
import { createResultUtil, TResult } from "../../../utils/result.util"


export interface ISalesListStore {
    salesList: ISale[]
    getSalesListAction: () => Promise<TResult<null, null>>
    removeFileAction: (idVenta: string, hashArchivo: string) => Promise<TResult<null, null>>
    saveFileAction: (idVenta: string, file: File) => Promise<TResult<null, null>>
    payCuotaAction: (idVenta: string, numeroCuota: number) => Promise<TResult<null, null>>
    updateStateSaleAction: (idVenta: string) => Promise<TResult<null, null>>
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

    const removeFileAction = async (idVenta: string, hashArchivo: string) => {
        const result = await props.salesListService.removeFile(idVenta, hashArchivo)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const saveFileAction = async (idVenta: string, file: File) => {
        const result = await props.salesListService.saveFile(idVenta, file)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }

    const payCuotaAction = async (idVenta: string, numeroCuota: number) => {
        const result = await props.salesListService.payCuota(idVenta, numeroCuota)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(null)
    }
    const updateStateSaleAction = async (idVenta: string) => {
        const result = await props.salesListService.updateStateSale(idVenta)
        if (result.isError) return createResultUtil.error(null)
        setSalesList(salesList.map(sale => sale.idVenta === parseInt(idVenta) ? { ...sale, estado: { descripcion: "FINALIZADA", idEstado: 2 } } : sale))
        return createResultUtil.success(null)
    }


    return {
        salesList,
        getSalesListAction,
        removeFileAction,
        saveFileAction,
        payCuotaAction,
        updateStateSaleAction
    }
}