import { MovementListableComponent } from "./components/MovementListTable.component";
import { useMovementListHook } from "./hooks/useModule.hook";
import { IMovementListStore } from "./store/useMovementList.store";

interface IMovementListProps {
    movementListStore: IMovementListStore;
    onNavigate: (url: string) => void;
}

export const MovementListModule = (props: IMovementListProps) => {

    const useModule = useMovementListHook(props)

    return (
        <>
            <h1>asdasd</h1>
            <MovementListableComponent activityList={useModule.movementListState} searchValue="" />
        </>

    )
}
