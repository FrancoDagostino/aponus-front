import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { EntityAddFormComponent } from "./components/EntityAddForm.component"
import { useEntityAddHook } from "./hook/useModule.hook"
import { IEntityAddStore } from "./store/useEntityAdd.store";
import { UnAuthorizedModule } from "../unAuthorized/module";

interface IEntityAddModuleProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
    entityId: string
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}


export const EntityAddModule: FC<IEntityAddModuleProps> = (props) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }
    const useModule = useEntityAddHook(props)

    return (

        <EntityAddFormComponent onSaveHandler={useModule.onSaveHandler} formData={useModule.formData} onChangeFormData={useModule.onChangeFormDataHandler} />
    )
}