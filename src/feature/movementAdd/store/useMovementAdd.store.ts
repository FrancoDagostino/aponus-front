import { useState } from "react";
import { createResultUtil, TResult } from "../../../utils/result.util";
import { IMovementAddService } from "../service/useMovementAdd.service";
import { IEntity, ISuppliesList } from "../model/movement.model";
import { IMovimientoStock } from "../../movementList/model/movementList.model";

export interface IMovementAddStore {
    supplyList: ISuppliesList[]
    createNewMovementAction: (dataInput: any) => Promise<TResult<null, string>>
    getSupplyListAction: () => Promise<TResult<null, null>>
    getEntityListAction: (id: string) => Promise<TResult<IEntity[], null>>
    getMovementListAction: () => Promise<TResult<IMovimientoStock, null>>
}

interface IMovementAddStoreProps {
    movementAddService: IMovementAddService
}

export const useMovementAddStore = (props: IMovementAddStoreProps): IMovementAddStore => {

    const [supplyList, setSupplyList] = useState<ISuppliesList[]>([])



    const getMovementListAction: IMovementAddStore["getMovementListAction"] = async () => {

        const result = await props.movementAddService.getMovementList()
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(result.data.find(movement => movement.idMovimiento === 0)!)
    }

    const createNewMovementAction: IMovementAddStore["createNewMovementAction"] = async (dataInput: any) => {
        const result = await props.movementAddService.postCreateNewMovement(dataInput)
        if (result.isError) return createResultUtil.error(result.data ?? "")
        return createResultUtil.success(null)
    }

    const getSupplyListAction: IMovementAddStore["getSupplyListAction"] = async () => {
        const result = await props.movementAddService.getSupplyList()
        if (result.isError) return createResultUtil.error(result.data)
        setSupplyList(result.data)
        return createResultUtil.success(null)
    }

    const getEntityListAction: IMovementAddStore["getEntityListAction"] = async (id: string) => {
        const result = await props.movementAddService.getProviderList(id)
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(result.data)
    }

    return {
        supplyList,
        createNewMovementAction,
        getSupplyListAction,
        getEntityListAction,
        getMovementListAction
    }
}