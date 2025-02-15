import { useState } from "react"
import { IListadoComponentes, IRowContainer } from "../model/component.model"
import { IComponentListService } from "../services/useComponentList.service"
import { createResultUtil, TResult } from '../../../utils/result.util';

export interface IComponentListStore {
    componentList: IListadoComponentes[]
    reportComponentScheme: IRowContainer
    getComponentListAction: (idDescription: number) => Promise<TResult<null, null>>
    getMockComponentListAction: (idDescription: number) => Promise<TResult<null, null>>
}

interface IComponentListStoreProps {
    componentListService: IComponentListService
}

export const useComponentListStore = (props: IComponentListStoreProps): IComponentListStore => {
    const [componentList, setComponentList] = useState<IListadoComponentes[]>([])
    const [reportComponentScheme, setReportComponentScheme] = useState<IRowContainer>({
        rowList: []
    })

    const getComponentListAction: IComponentListStore["getComponentListAction"] = async (idDescription: number) => {

        const result = await props.componentListService.getComponentList(idDescription)
        if (result.isError) return createResultUtil.error(null)
        setComponentList(result.data)
        return createResultUtil.success(null)
    }

    const getMockComponentListAction = async (idDescription: number) => {
        const result = await props.componentListService.getMockComponentList(idDescription)
        if (result.isError) return createResultUtil.error(null)
        setReportComponentScheme(result.data)
        return createResultUtil.success(null)
    }

    return {
        componentList,
        reportComponentScheme,
        getMockComponentListAction,
        getComponentListAction
    }
}
