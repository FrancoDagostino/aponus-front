import { MovementFormComponent } from "./components/movementForm.component";
import { useMovementAddHook } from "./hooks/useModule.hook";
import { IMovementAddStore } from "./store/useMovementAdd.store";


interface IMovementAddProps {
    movementAddStore: IMovementAddStore;
    onNavigate: (url: string) => void;
}

export const MovementAddModule = (props: IMovementAddProps) => {

    const useModule = useMovementAddHook(props)
    useModule
    return (
        <>
            <MovementFormComponent />
        </>

    )
}
