import { IDashboardService } from "../services/useDashboard.service"
import { TResult, createResultUtil } from "../../../utils/result.util"
import { IPendingSales, IProducts, IDescriptions } from "../models/dashboard.model"
import { useState } from "react"
import { IRowContainer } from "../../componentList/model/component.model"
interface IDashboardStoreProps {
    dashboardService: IDashboardService
}
export interface IDashboardStore {
    getComprasAction: () => Promise<TResult<null, null>>
    getPendingSalesAction: () => Promise<TResult<null, null>>
    getProductsAction: () => Promise<TResult<null, null>>
    getDescriptionAction: () => Promise<TResult<null, null>>
    getSupplieListAction: (idDescription: number) => Promise<TResult<null, null>>
    pendingSales: IPendingSales[]
    products: IProducts[]
    descriptions: IDescriptions[]
    supplieList: IRowContainer
}

export const useDashboardStore = (props: IDashboardStoreProps): IDashboardStore => {

    const [pendingSales, setPendingSales] = useState<IPendingSales[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [descriptions, setDescriptions] = useState<IDescriptions[]>([])
    const [supplieList, setSupplieList] = useState<IRowContainer>({
        rowList: []
    })
    const getComprasAction = async () => {
        const result = await props.dashboardService.getCompras()
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(result.data)
    }

    const getPendingSalesAction = async () => {
        const result = await props.dashboardService.getPendingSales()
        if (result.isError) return createResultUtil.error(result.data)
        setPendingSales(result.data)
        return createResultUtil.success(null)
    }

    const getProductsAction = async () => {
        const result = await props.dashboardService.getProducts()
        if (result.isError) return createResultUtil.error(result.data)
        setProducts(result.data)
        return createResultUtil.success(null)
    }

    const getDescriptionAction = async () => {
        const result = await props.dashboardService.getDescription()
        if (result.isError) return createResultUtil.error(result.data)
        setDescriptions(result.data)
        return createResultUtil.success(null)
    }

    const getSupplieListAction = async (idDescription: number) => {
        const result = await props.dashboardService.getSupplieList(idDescription)
        if (result.isError) return createResultUtil.error(result.data)
        setSupplieList(result.data)
        return createResultUtil.success(null)
    }
    return {
        getComprasAction,
        getPendingSalesAction,
        getProductsAction,
        getDescriptionAction,
        getSupplieListAction,
        pendingSales,
        products,
        descriptions,
        supplieList
    }
}
