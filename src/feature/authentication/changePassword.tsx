import { IAuthStore } from "./store/useAuth.store"
import { IUiHook } from "../ui/hooks/useUi.hook"
import { Box, CircularProgress } from "@mui/material"
import { TextField, Button, Alert } from "@mui/material"
import { Link } from "react-router-dom"
import { useAuthModuleHook } from "./hooks/useAuthModule.hook"

interface IModuleChangePasswordProps {
    authStore: IAuthStore
    uiHook: IUiHook
    onNavigate: (path: string) => void
}


export const ModuleChangePassword = (props: IModuleChangePasswordProps) => {
    const moduleAuthHook = useAuthModuleHook({ authStore: props.authStore, onNavigate: props.onNavigate, uiHook: props.uiHook });

    const isPasswordError = moduleAuthHook.passwordRecovery.password !== moduleAuthHook.passwordRecovery.confirmPassword

    return (
        <div className="login-container">
            <div className="login-head">
                <img src="https://aponus.com.ar/images/logo_chico.png" alt="Logo" className="login-logo" />
            </div>
            <div className="login-form">
                <Box
                    className="login-container-form">
                    <Box mb={2}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="standard"
                            margin="normal"
                            name="password"
                            value={moduleAuthHook.passwordRecovery.password}
                            onChange={moduleAuthHook.onPasswordRecoveryHandler} />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Confirmar contraseña"
                            type="password"
                            variant="standard"
                            margin="normal"
                            name="confirmPassword"
                            value={moduleAuthHook.passwordRecovery.confirmPassword}
                            onChange={moduleAuthHook.onPasswordRecoveryHandler} />
                    </Box>
                    {isPasswordError && (
                        <Alert severity="error" className="alert">
                            Las contraseñas no coinciden.
                        </Alert>
                    )}
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
                                    color="primary"
                                    disabled={isPasswordError || moduleAuthHook.passwordRecovery.confirmPassword === "" || moduleAuthHook.passwordRecovery.password === ""}
                                    onClick={() => moduleAuthHook.onChangePasswordHandlerRecover()}>
                                    CAMBIAR CONTRASEÑA
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
