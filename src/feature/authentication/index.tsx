import { FC } from "react"
import { IAuthStore } from "./store/useAuth.store"
import { useAuthModuleHook } from "./hooks/useAuthModule.hook"
import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
import './index.css'

interface IAuthProps {
    authStore: IAuthStore
    onNavigate: (url: string) => void
}

export const ModuleAuth: FC<IAuthProps> = (props) => {
    const moduleAuthHook = useAuthModuleHook({ authStore: props.authStore, onNavigate: props.onNavigate });
    return (
        <div className="login-container">
            <div className="login-head">
                <img src="src\assets\images\logo-vertical.svg" alt="Logo" className="login-logo" />
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
                    <TextField
                        label="Contraseña"
                        type="password"
                        variant="standard"
                        margin="normal"
                        onChange={(e) => moduleAuthHook.onChangePasswordHandler(e.target.value)} />
                    <Link
                        to={"#"}
                        className="login-link-form">
                        He olvidado mi contraseña
                    </Link>
                    {
                        moduleAuthHook.isLoading === true ?
                            <Box className="login-container-progress">
                                <CircularProgress />
                            </Box>
                            :
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary">
                                INICIAR SESIÓN
                            </Button>
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