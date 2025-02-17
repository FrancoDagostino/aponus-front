import { FC } from "react"
import { IUiHook } from "../ui/hooks/useUi.hook"
import { IAuditoriaStore } from "./store/useAudotria.store"
import { useAuditoriaHook } from "./hooks/useAuditoria.hook"
import { AuditoriaDataGridComponent } from "./components/AuditoriaDataGrid.component"
import { ModalAuditViewComponent } from "./components/ModalAuditView.componen"
export interface IModuleAuditoriaProps {
    uiHook: IUiHook
    auditoriaStore: IAuditoriaStore
    onNavigate: (url: string) => void
}


export const ModuleAuditoria: FC<IModuleAuditoriaProps> = (props) => {

    const auditoriaHook = useAuditoriaHook({
        auditoriaStore: props.auditoriaStore,
        uiHook: props.uiHook
    })
    auditoriaHook

    return (
        <>
            <h1>Auditoria </h1>
            <AuditoriaDataGridComponent
                auditList={props.auditoriaStore.auditoria}
                searchValue={""}
                onViewSale={auditoriaHook.openModal}
            />
            <ModalAuditViewComponent
                isOpen={auditoriaHook.isOpen}
                onClose={auditoriaHook.closeModal}
                newValueAudit={auditoriaHook.newValueAudit}
            />
        </>
    )


}

