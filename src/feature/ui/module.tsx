import { FC } from "react";
import LoaderComponent from "../../components/Loader/Loader.component";
import { IUiHook } from "./hooks/useUi.hook";
import { SnackBarComponent } from "../../components/Snackbar/Snackbar.component";


interface UiModuleProps {
    uiStore: IUiHook;
}


export const UiModule: FC<UiModuleProps> = (props) => {
    return (
        <>
            <LoaderComponent isOpen={props.uiStore.isLoading} />
            <SnackBarComponent message={props.uiStore.snackbar.message} isOpen={props.uiStore.snackbar.isOpen} />
        </>
    )
}