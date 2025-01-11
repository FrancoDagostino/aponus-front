import { IUiHook } from "../ui/hooks/useUi.hook";
import { UnAuthorizedModule } from "../unAuthorized/module";
import { MovementFormComponent } from "./components/movementForm.component";
import { useMovementAddHook } from "./hooks/useModule.hook";
import { IMovementAddStore } from "./store/useMovementAdd.store";


interface IMovementAddProps {
    movementAddStore: IMovementAddStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const MovementAddModule = (props: IMovementAddProps) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }

    const useModule = useMovementAddHook(props)
    useModule
    return (
        <>
            <MovementFormComponent availableSupplies={props.movementAddStore.supplyList} formData={useModule.formData} onAddInputFilesHanlder={useModule.onAddInputFilesHanlder} onChangeFormDataHandler={useModule.onChangeFormDataHandler}
                onRemoveFileHandler={useModule.onRemoveFileHandler}
                onSaveHandler={useModule.onSaveHandler}
                onAddSupplyItemHandler={useModule.onAddSupplyItemHandler}
                providerList={useModule.providerList}
            />
        </>

    )
}
