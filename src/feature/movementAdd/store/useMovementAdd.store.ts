import { createResultUtil, TResult } from "../../../utils/result.util";
import { IMovementAddService } from "../service/useMovementAdd.service";

export interface IMovementAddStore {
    createNewMovementAction: (dataInput: any) => Promise<TResult<null, null>>

}

interface IMovementAddStoreProps {
    movementAddService: IMovementAddService
}

export const useMovementAddStore = (props: IMovementAddStoreProps): IMovementAddStore => {

    const createNewMovementAction: IMovementAddStore["createNewMovementAction"] = async (dataInput: any) => {
        const result = await props.movementAddService.postCreateNewMovement(dataInput)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    return {
        createNewMovementAction
    }
}