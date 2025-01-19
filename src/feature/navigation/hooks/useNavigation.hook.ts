import { useHistory } from "react-router-dom";


export interface IModuleHook {
    onClickMenuItemHandler: (path: string) => void;
}


export const useModuleHook = (): IModuleHook => {
    const history = useHistory()

    const onClickMenuItemHandler: IModuleHook["onClickMenuItemHandler"] = (path: string) => {
        if (!path.startsWith("/")) {
            path = `/${path}`;
        }
        history.push(path);
    };

    return {
        onClickMenuItemHandler
    }
}