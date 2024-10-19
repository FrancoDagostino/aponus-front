import { useState } from "react"
import { IListadoComponentes } from "../model/component.model"
import { IComponentListService } from "../services/useComponentList.service"
import { createResultUtil, TResult } from '../../../utils/result.util';

export interface IComponentListStore {
    componentList: IListadoComponentes[]
    getComponentListAction: (idDescription: number) => Promise<TResult<null, null>>
}

interface IComponentListStoreProps {
    componentListService: IComponentListService
}

export const useComponentListStore = (props: IComponentListStoreProps): IComponentListStore => {
    const [componentList, setComponentList] = useState<IListadoComponentes[]>([])

    const getComponentListAction: IComponentListStore["getComponentListAction"] = async (idDescription: number) => {

        const result = await props.componentListService.getComponentList(idDescription)
        if (result.isError) return createResultUtil.error(null)
        setComponentList(result.data)
        return createResultUtil.success(null)
    }

    return {
        componentList,
        getComponentListAction
    }
}
