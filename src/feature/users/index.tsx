import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { IUserStore } from "./store/useUser.store";
import { useUserHook } from "./hooks/useUser.hook";
import { UserFormData } from "./components/userFormData.component";
interface IModuleUserProps {
    uiHook: IUiHook
    userStore: IUserStore
    onNavigate: (path: string) => void
}

export const ModuleUser: FC<IModuleUserProps> = (props) => {
    const useModule = useUserHook({
        uiHook: props.uiHook,
        userStore: props.userStore
    })
    return (
        <div>
            <UserFormData formData={useModule.user} onChangeUserHandler={useModule.onChangeUserHandler} roles={props.userStore.roles} onSaveHandler={useModule.onCreateUserHandler} />
        </div>
    )
}