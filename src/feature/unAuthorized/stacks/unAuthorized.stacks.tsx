import { Route } from "react-router-dom"
import { UnAuthorizedModule } from "../module"



export const UnAuthorizedStack = () => [

    <Route
        exact
        key="/unAuthorized"
        path="/unAuthorized"
        render={() => (
            <UnAuthorizedModule />
        )}
    />,
]
