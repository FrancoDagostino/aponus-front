import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { IEntityListService } from "../service/useEntityList.service";
import { IEntity } from "../model/EntityList.model";


export interface IEntityListStoreProps {
    entityListService: IEntityListService
}

export interface IEntityListStore {
    entityListState: IEntity[]
    getEntityListAction: () => Promise<TResult<null, null>>
    getEntityListByIdAction: (id: number) => Promise<TResult<null, null>>
    deleteEntityByIdAction: (id: number) => Promise<TResult<null, null>>

}

export const useEntityListStore = (props: IEntityListStoreProps): IEntityListStore => {

    const [entityListState, setEntityListState] = useState<IEntity[]>([])

    const getEntityListAction: IEntityListStore["getEntityListAction"] = async () => {
        const result = await props.entityListService.getEntityList()
        if (result.isError) return createResultUtil.error(null)
        setEntityListState(result.data)
        return createResultUtil.error(null)
    }

    const getEntityListByIdAction: IEntityListStore["getEntityListByIdAction"] = async (id: number) => {
        const result = await props.entityListService.getEntityListById(id)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const deleteEntityByIdAction: IEntityListStore["deleteEntityByIdAction"] = async (id: number) => {
        const result = await props.entityListService.deleteEntity(id)
        if (result.isError) return createResultUtil.error(null)
        setEntityListState(entityListState.filter(entity => entity.idEntidad !== id))
        return createResultUtil.success(null)
    }

    return {
        entityListState,
        getEntityListAction,
        getEntityListByIdAction,
        deleteEntityByIdAction
    }
}