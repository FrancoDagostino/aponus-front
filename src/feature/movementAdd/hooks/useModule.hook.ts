import { IMovementAddStore } from "../store/useMovementAdd.store";


interface IMovementAddHookProps {
    movementAddStore: IMovementAddStore;
    onNavigate: (url: string) => void;
}

interface IMovementAddHook {

}

export const useMovementAddHook = (props: IMovementAddHookProps): IMovementAddHook => {
    props
    return {}
}