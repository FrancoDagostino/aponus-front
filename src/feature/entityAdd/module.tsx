import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { EntityAddFormComponent } from "./components/EntityAddForm.component"
import { useEntityAddHook } from "./hook/useModule.hook"
import { IEntityAddStore } from "./store/useEntityAdd.store";

interface IEntityAddModuleProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
    entityId: string
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}


export const EntityAddModule: FC<IEntityAddModuleProps> = (props) => {


    const useModule = useEntityAddHook(props)

    return (

        <EntityAddFormComponent cityListState={props.entityAddStore.cityListState} onChangeCity={useModule.onChangeCity} onChangeProvince={useModule.onChangeProvince} provinceListState={props.entityAddStore.provinceListState} geoIds={useModule.geoIds} onChangeCountrie={useModule.onChangeCountrie} countryListState={props.entityAddStore.countryListState} onSaveHandler={useModule.onSaveHandler} formData={useModule.formData} onChangeIdTipo={useModule.onChangeIdTipo} categoriaListState={props.entityAddStore.categoriaListState} onChangeFormData={useModule.onChangeFormDataHandler} />
    )
}