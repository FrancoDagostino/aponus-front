import { Route } from "react-router-dom";
import { IMovementAddStore } from "../store/useMovementAdd.store";
import { MovementAddModule } from "../module";




interface IMovementAddStackProps {
    movementAddStore: IMovementAddStore;

}

export const MovementAddtStack = (props: IMovementAddStackProps) => [
    <Route
        exact
        key="/movements-add"
        path="/movements-add"
        render={(route) => (
            <MovementAddModule
                movementAddStore={props.movementAddStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]
