import { Route } from "react-router-dom"
import { MovementListModule } from "../module"
import { IMovementListStore } from "../store/useMovementList.store";




interface IMovementListStackProps {
    movementListStore: IMovementListStore;
}

export const MovementListStack = (props: IMovementListStackProps) => [
    <Route
        exact
        key="/movements-list"
        path="/movements-list"
        render={(route) => (
            <MovementListModule
                movementListStore={props.movementListStore}
                onNavigate={route.history.push}
            />
        )}
    />,
]