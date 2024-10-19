import { FC } from "react";
import LoaderComponent from "../../components/Loader/Loader.component";
import { IUiHook } from "./hooks/useUi.hook";


interface UiModuleProps {
    uiStore: IUiHook;
}


export const UiModule: FC<UiModuleProps> = (props) => {

    return (
        <LoaderComponent isOpen={props.uiStore.isLoading} />
    )
}