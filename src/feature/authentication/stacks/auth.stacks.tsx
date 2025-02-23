import { Redirect, Route } from "react-router-dom";
import { IAuthStore } from "../store/useAuth.store";
import { ModuleAuth } from "..";
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { ModuleChangePassword } from "../changePassword";

interface IAuthStackProps {
    authStore: IAuthStore
    uiHook: IUiHook
    isChangePassword: boolean
    username: string
}

export const AuthStack = (props: IAuthStackProps) => [
    props.isChangePassword && props.username !== "" ? (
        <>
            <Route
                exact
                key="/changePassword"
                path="/changePassword"
                render={(route) => (
                    <ModuleChangePassword authStore={props.authStore} onNavigate={route.history.push} uiHook={props.uiHook} />
                )}
            />,
            <Redirect
                exact
                key="redirectToChangePassword"
                path='*'
                to="/changePassword"
            />
        </>
    ) : (
        <>
            <Route
                exact
                key="/login"
                path="/login"
                render={(route) => (
                    <ModuleAuth authStore={props.authStore} onNavigate={route.history.push} uiHook={props.uiHook} />
                )}
            />,
            <Redirect
                exact
                key="redirectToLogin"
                path='*'
                to="/login"
            />
        </>
    )
]
