import { Route } from "react-router-dom"
import { IEntityListStore } from "../store/useEntityList.store";
import { EntityListModule } from "../module";
import { IUiHook } from "../../ui/hooks/useUi.hook";



interface IEntityListStackProps {
    entityListStore: IEntityListStore
    uiHook: IUiHook
    permissions: string[]
    rol: string
}

export const EntityListStack = (props: IEntityListStackProps) => [
    <Route
        exact
        key="/entity-list"
        path="/entity-list"
        render={(route) => (
            <EntityListModule
                permissions={props.permissions}
                rol={props.rol}
                entityListStore={props.entityListStore}
                uiHook={props.uiHook}
                onNavigate={route.history.push}
            />
        )}
    />,
]
