import { IDashboardService } from "../services/useDashboard.service"
import { TResult, createResultUtil } from "../../../utils/result.util"
import { IPendingSales, IProducts, IDescriptions, ISalesForMonth } from "../models/dashboard.model"
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
    getBarChartAction: () => Promise<TResult<null, null>>
    pendingSales: IPendingSales[]
    products: IProducts[]
    descriptions: IDescriptions[]
    supplieList: IRowContainer
    barChart: ISalesForMonth[]
}

export const useDashboardStore = (props: IDashboardStoreProps): IDashboardStore => {

    const [pendingSales, setPendingSales] = useState<IPendingSales[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    const [descriptions, setDescriptions] = useState<IDescriptions[]>([])
    const [supplieList, setSupplieList] = useState<IRowContainer>({
        rowList: []
    })
    const [barChart, setBarChart] = useState<ISalesForMonth[]>([])
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

    const getBarChartAction = async () => {
        const result = await props.dashboardService.getBarChart()
        if (result.isError) return createResultUtil.error(result.data)
        setBarChart(result.data)
        return createResultUtil.success(null)
    }
    return {
        getComprasAction,
        getPendingSalesAction,
        getProductsAction,
        getDescriptionAction,
        getSupplieListAction,
        getBarChartAction,
        pendingSales,
        products,
        descriptions,
        supplieList,
        barChart
    }
}
