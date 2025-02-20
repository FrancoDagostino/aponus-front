import { useState, useEffect } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { SelectChangeEvent } from "@mui/material"
import { IUserStore } from "../store/useUser.store"

interface IUseUserHookProps {
    userStore: IUserStore
    uiHook: IUiHook
}

export interface IUserView {
    usuario: string,
    idRol: string,
    correo: string,
    contraseña: string
}

interface IUserHook {
    user: IUserView
    onCreateUserHandler: () => Promise<void>
    onChangeUserHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
}

export const useUserHook = (props: IUseUserHookProps): IUserHook => {


    const [user, setUser] = useState<IUserView>({
        usuario: '',
        idRol: '',
        correo: '',
        contraseña: ''
    })

    useEffect(() => {
        onInit()
    }, [])

    const onInit = async () => {
        props.uiHook.showLoading()
        await props.userStore.getRolesAction()
        props.uiHook.hideLoading()
    }

    const onCreateUserHandler = async () => {
        props.uiHook.showLoading()
        const result = await props.userStore.createUserAction(user)
        props.uiHook.hideLoading()
        props.uiHook.onSetSnackbar("Usuario creado correctamente", true)
        setUser({
            usuario: '',
            idRol: '',
            correo: '',
            contraseña: ''
        })
        if (result.isError) return

    }

    const onChangeUserHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { value, name } = event.target
        setUser({ ...user, [name]: value })
    }

    return {
        user,
        onCreateUserHandler,
        onChangeUserHandler
    }
}
