import { Route } from "react-router-dom";
import { IMovementAddStore } from "../store/useMovementAdd.store";
import { MovementAddModule } from "../module";
import { IUiHook } from "../../ui/hooks/useUi.hook";




interface IMovementAddStackProps {
    movementAddStore: IMovementAddStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string

}

export const MovementAddtStack = (props: IMovementAddStackProps) => [
    <Route
        exact
        key="/movements-add"
        path="/movements-add"
        render={(route) => (
            <MovementAddModule
                permissions={props.permissions}
                rol={props.rol}
                movementAddStore={props.movementAddStore}
                onNavigate={route.history.push}
                uiHook={props.uiHook}
            />
        )}
    />,
]
