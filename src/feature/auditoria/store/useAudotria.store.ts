import { IAuditoriaService } from "../services/useAuditoria.service"
import { createResultUtil, TResult } from "../../../utils/result.util"
import { useState } from "react";
import { IAuditoria } from "../models/auditoria.model";

export interface IAuditoriaStoreProps {
    auditoriaService: IAuditoriaService
}

export interface IAuditoriaStore {
    auditoria: IAuditoria[]
    getAuditoriaAction: () => Promise<TResult<IAuditoria[], null>>;
}


export const useAuditoriaStore = (props: IAuditoriaStoreProps): IAuditoriaStore => {

    const [auditoria, setAuditoria] = useState<IAuditoria[]>([])

    const getAuditoriaAction: IAuditoriaStore["getAuditoriaAction"] = async () => {
        const result = await props.auditoriaService.getAuditoria()
        if (result.isError) return createResultUtil.error(result.data)
        setAuditoria(result.data)
        return createResultUtil.success(result.data)
    }


    return {
        auditoria,
        getAuditoriaAction
    }
}

