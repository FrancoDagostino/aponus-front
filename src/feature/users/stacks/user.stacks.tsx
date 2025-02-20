import { Route } from "react-router-dom"
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { ModuleUser } from "..";
import { IUserStore } from "../store/useUser.store";



interface IUserStackProps {
    uiHook: IUiHook
    userStore: IUserStore
}

export const UserStack = (props: IUserStackProps) => [
    <Route
        exact
        key="/user"
        path="/user"
        render={(route) => (
            <ModuleUser
                uiHook={props.uiHook}
                onNavigate={route.history.push}
                userStore={props.userStore}
            />
        )}
    />,
]
