


import { Route } from "react-router-dom"
import { EntityAddModule } from "../module"
import { IEntityAddStore } from "../store/useEntityAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";

interface IEntityAddStackProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
}


export const EntityAddStack = (props: IEntityAddStackProps) => [
    <Route
        exact
        key="/entity-add"
        path="/entity-add"
        render={(route) => (
            <EntityAddModule onNavigate={route.history.push} entityAddStore={props.entityAddStore} uiHook={props.uiHook} />

        )}
    />,
]
