import { Route } from "react-router-dom"
import { IEntityListStore } from "../store/useEntityList.store";
import { EntityListModule } from "../module";
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface IEntityListStackProps {
    entityListStore: IEntityListStore
    uiHook: IUiHook
}

export const EntityListStack = (props: IEntityListStackProps) => [
    <Route
        exact
        key="/entity-list"
        path="/entity-list"
        render={(route) => (
            <EntityListModule
                entityListStore={props.entityListStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
