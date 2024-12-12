import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { EntityAddFormComponent } from "./components/EntityAddForm.component"
import { useEntityAddHook } from "./hook/useModule.hook"
import { IEntityAddStore } from "./store/useEntityAdd.store";

interface IEntityAddModuleProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
    entityId: string
    onNavigate: (url: string) => void;
}


export const EntityAddModule: FC<IEntityAddModuleProps> = (props) => {

    const useModule = useEntityAddHook(props)

    return (

        <EntityAddFormComponent onSaveHandler={useModule.onSaveHandler} formData={useModule.formData} onChangeFormData={useModule.onChangeFormDataHandler} />
    )
}