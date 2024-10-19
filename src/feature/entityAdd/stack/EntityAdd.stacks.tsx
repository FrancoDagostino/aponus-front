


import { Route } from "react-router-dom"
import { EntityAddModule } from "../module"



export const EntityAddStack = () => [
    <Route
        exact
        key="/entity-add"
        path="/entity-add"
        render={(route) => (
            <EntityAddModule />

        )}
    />,
]
