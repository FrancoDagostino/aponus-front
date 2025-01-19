import { createResultUtil, TResult } from '../../../utils/result.util';
import { IEntityAddService } from "../service/useEntityAdd.service";
import { IFormData } from "../hook/useModule.hook";
import { IEntity } from '../model/entityAdd.model';

export interface IEntityAddStore {
    addNewEntityAction: (dataInput: IFormData) => Promise<TResult<null, null>>
    getNewEntityAction: (entityId: string) => Promise<TResult<IEntity[], null>>
    editEntityAction: (dataInput: IFormData, idEntity: number) => Promise<TResult<null, null>>
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
        return createResultUtil.success(result.data)
    }

    const editEntityAction = async (dataInput: IFormData, idEntity: number) => {
        const result = await props.entityAddService.editEntity(dataInput, idEntity)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }


    return {
        addNewEntityAction,
        getNewEntityAction,
        editEntityAction
    }
}
