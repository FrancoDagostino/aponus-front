import { FC } from "react";
import { IEntityListStore } from "./store/useEntityList.store";
import { EntityTableListComponent } from "./components/EntityListTable.component";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { useEntityListHook } from "./hooks/useModule.hook";
import { EntityViewModalComponent } from "./components/EntityViewModal.component";

interface IEntityListProps {
    entityListStore: IEntityListStore
    uiHook: IUiHook
    onNavigate: (url: string) => void;
}



export const EntityListModule: FC<IEntityListProps> = (props) => {
    const useModule = useEntityListHook(props)

    console.log(props.entityListStore.entityListState[0])

    return (
        <>
            <EntityTableListComponent data={props.entityListStore.entityListState} onViewEntityHandler={useModule.onViewEntityHandler} />
            <EntityViewModalComponent entity={useModule.entityState} isOpen={useModule.isOpen} handleClose={useModule.handleClose} />

        </>
    )
}