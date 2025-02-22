import { FC } from "react";
import LoaderComponent from "../../components/Loader/Loader.component";
import { IUiHook } from "./hooks/useUi.hook";
import { SnackBarComponent } from "../../components/Snackbar/Snackbar.component";
import AlertModal from "../../components/Alert.component";


interface UiModuleProps {
    uiStore: IUiHook;
}


export const UiModule: FC<UiModuleProps> = (props) => {
    return (
        <>
            <LoaderComponent isOpen={props.uiStore.isLoading} />
            <SnackBarComponent message={props.uiStore.snackbar.message} isOpen={props.uiStore.snackbar.isOpen} />
            <AlertModal message={props.uiStore.alert.message} title={props.uiStore.alert.title} type={props.uiStore.alert.type} open={props.uiStore.alert.isOpen} onClose={props.uiStore.closeAlert} confirmButton={undefined} />
        </>
    )
}