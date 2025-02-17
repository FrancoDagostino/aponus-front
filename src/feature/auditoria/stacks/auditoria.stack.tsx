import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { IAuditoriaStore } from "../store/useAudotria.store";
import { ModuleAuditoria } from "../index";



interface IAuditoriaStackProps {
    uiHook: IUiHook
    auditoriaStore: IAuditoriaStore
}

export const AuditoriaStack = (props: IAuditoriaStackProps) => [
    <Route
        exact
        key="/auditoria"
        path="/auditoria"
        render={(route) => (
            <ModuleAuditoria
                auditoriaStore={props.auditoriaStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
