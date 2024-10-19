import { IComponentAdd } from "../model/componentAdd.model"
import { IComponentAddService } from "../services/useComponentAdd.service"
import { createResultUtil, TResult } from '../../../utils/result.util';

export interface IComponentAddStore {
    postCreateComponentAction: (newComponent: IComponentAdd, description: string) => Promise<TResult<null, null>>
}

interface IComponentAddStoreProps {
    componentAddService: IComponentAddService
}

export const useComponentAddStore = (props: IComponentAddStoreProps): IComponentAddStore => {

    const postCreateComponentAction: IComponentAddStore["postCreateComponentAction"] = async (newComponent: IComponentAdd, description: string) => {

        const result = await props.componentAddService.postCreateComponent(newComponent, description)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    return {
        postCreateComponentAction
    }
}