import { IDashboardService } from "../services/useDashboard.service"
import { TResult, createResultUtil } from "../../../utils/result.util"
interface IDashboardStoreProps {
    dashboardService: IDashboardService
}
export interface IDashboardStore {
    getComprasAction: () => Promise<TResult<null, null>>
}

export const useDashboardStore = (props: IDashboardStoreProps): IDashboardStore => {



    const getComprasAction = async () => {
        const result = await props.dashboardService.getCompras()
        if (result.isError) return createResultUtil.error(result.data)
        return createResultUtil.success(result.data)
    }

    return {
        getComprasAction
    }
}
