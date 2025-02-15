import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { PurchaseAddModule } from "../module";
import { IPurchaseAddStore } from "../store/usePurchaseAdd.store";
import { IMovementAddStore } from "../../movementAdd/store/useMovementAdd.store";





interface IPucharseAddStackProps {
    uiHook: IUiHook
    pucharseAddStore: IPurchaseAddStore
    movementAddStore: IMovementAddStore;
    permissions: string[]
    rol: string

}

export const PucharseAddStack = (props: IPucharseAddStackProps) => [
    <Route
        exact
        key="/pucharse-add"
        path="/pucharse-add"
        render={(route) => (
            <PurchaseAddModule
                permissions={props.permissions}
                rol={props.rol}
                movementAddStore={props.movementAddStore}
                purchaseAddStore={props.pucharseAddStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
