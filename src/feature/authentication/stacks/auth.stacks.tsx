import { Redirect, Route } from "react-router-dom";
import { IAuthStore } from "../store/useAuth.store";
import { ModuleAuth } from "..";


interface IAuthStackProps {
    authStore: IAuthStore
}

export const AuthStack = (props: IAuthStackProps) => [
    <Route
        exact
        key="/login"
        path="/login"
        render={(route) => (
            <ModuleAuth authStore={props.authStore} onNavigate={route.history.push} />
        )}
    />,

    <Redirect
        exact
        key="redirectToLogin"
        path='*'
        to="/login"
    />

]
