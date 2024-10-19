import { IMovementListService } from "../service/useMovementList.service"
import { IMovimientoStock } from "../model/movementList.model"
import { createResultUtil, TResult } from "../../../utils/result.util"




export interface IMovementListStore {
    getMovementListAction: () => Promise<TResult<IMovimientoStock[], null>>
}

export interface IMovementListStoreProps {
    movementListService: IMovementListService

}

export const useMovementListStore = (props: IMovementListStoreProps): IMovementListStore => {



    const getMovementListAction: IMovementListStore["getMovementListAction"] = async () => {

        const result = await props.movementListService.getMovementList()
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(result.data)
    }

    return {
        getMovementListAction
    }
}
