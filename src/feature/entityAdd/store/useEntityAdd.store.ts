import { createResultUtil, TResult } from '../../../utils/result.util';
import { IEntityAddService } from "../service/useEntityAdd.service";
import { IFormData } from "../hook/useModule.hook";

export interface IEntityAddStore {
    addNewEntityAction: (dataInput: IFormData) => Promise<TResult<null, null>>
    getNewEntityAction: (entityId: string) => Promise<TResult<null, null>>
}

interface IEntityAddStoreProps {
    entityAddService: IEntityAddService
}

export const useEntityAddStore = (props: IEntityAddStoreProps): IEntityAddStore => {

    const addNewEntityAction: IEntityAddStore["addNewEntityAction"] = async (dataInput: IFormData) => {
        const result = await props.entityAddService.newEntity(dataInput)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const getNewEntityAction = async (entityId: string) => {
        const result = await props.entityAddService.getEntity(entityId)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }


    return {
        addNewEntityAction,
        getNewEntityAction
    }
}
