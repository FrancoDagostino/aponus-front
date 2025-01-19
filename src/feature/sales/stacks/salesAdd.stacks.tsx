import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { SalesAddModule } from "../module";
import { IMovementAddStore } from "../../movementAdd/store/useMovementAdd.store";
import { ISalesAddStore } from "../store/useSalesAdd.store";



interface ISalesAddStackProps {
    uiHook: IUiHook
    salesAddStore: ISalesAddStore
    movementAddStore: IMovementAddStore;
    permissions: string[]
    rol: string

}

export const SalesAddStack = (props: ISalesAddStackProps) => [
    <Route
        exact
        key="/sales-add"
        path="/sales-add"
        render={(route) => (
            <SalesAddModule
                permissions={props.permissions}
                rol={props.rol}
                movementAddStore={props.movementAddStore}
                salesAddStore={props.salesAddStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
