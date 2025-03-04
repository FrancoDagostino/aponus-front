import { FC } from "react"
import { IAuthStore } from "./store/useAuth.store"
import { useAuthModuleHook } from "./hooks/useAuthModule.hook"
import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import './index.css'
import { IUiHook, } from "../ui/hooks/useUi.hook"
interface IAuthProps {
    authStore: IAuthStore
    uiHook: IUiHook
    onNavigate: (url: string) => void
}

export const ModuleAuth: FC<IAuthProps> = (props) => {
    const moduleAuthHook = useAuthModuleHook({ authStore: props.authStore, onNavigate: props.onNavigate, uiHook: props.uiHook });
    return (
        <div className="login-container">
            <div className="login-head">
                <img src="https://aponus.com.ar/images/logo_chico.png" alt="Logo" className="login-logo" />
            </div>
            <div className="login-form">
                <Box
                    component="form"
                    className="login-container-form"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => moduleAuthHook.onLoginHandler(e)}>
                    <TextField
                        label="Usuario"
                        variant="standard"
                        margin="normal"
                        onChange={(e) => moduleAuthHook.onChangeUserNameHandler(e.target.value)} />
                    {
                        !moduleAuthHook.isRecoverPassword && (
                            <TextField
                                label="Contraseña"
                                type="password"
                                variant="standard"
                                margin="normal"
                                onChange={(e) => moduleAuthHook.onChangePasswordHandler(e.target.value)} />
                        )
                    }
                    {
                        !moduleAuthHook.isRecoverPassword && (
                            <label
                                className="login-link-form"
                                onClick={() => moduleAuthHook.onSetRecoverPasswordHandler()}>
                                He olvidado mi contraseña
                            </label>
                        )
                    }
                    {
                        moduleAuthHook.isRecoverPassword && (
                            <label
                                className="login-link-form"
                                onClick={() => moduleAuthHook.onSetRecoverPasswordHandler()}>
                                Volver
                            </label>
                        )
                    }
                    {
                        moduleAuthHook.isLoading === true ?
                            <Box className="login-container-progress">
                                <CircularProgress />
                            </Box>
                            :
                            moduleAuthHook.isRecoverPassword ? (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => moduleAuthHook.onRecoverPasswordHandler()}>
                                    RECUPERAR
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    INICIAR SESIÓN
                                </Button>
                            )
                    }
                    {
                        moduleAuthHook.error === true ?
                            <Alert
                                severity="error"
                                className="alert">
                                No se ha podido iniciar sesión.
                            </Alert>
                            :
                            null
                    }
                </Box>
            </div>
            <div className="login-footer">
                <Link
                    to={"#"}
                    className="login-link-footer">
                    Contact Us
                </Link>
                <label>Product by Team</label>
                <label>v1.0</label>
            </div>
        </div>
    )
}