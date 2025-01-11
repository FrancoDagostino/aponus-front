


import { Route } from "react-router-dom"
import { EntityAddModule } from "../module"
import { IEntityAddStore } from "../store/useEntityAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";

interface IEntityAddStackProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
    permissions: string[]
    rol: string
}


export const EntityAddStack = (props: IEntityAddStackProps) => [
    <Route
        exact
        key="/entity-add"
        path="/entity-add"
        render={(route) => (
            <EntityAddModule permissions={props.permissions} rol={props.rol} entityId="0" onNavigate={route.history.push} entityAddStore={props.entityAddStore} uiHook={props.uiHook} />

        )}
    />,
    <Route
        exact
        key="/entity-add/:entityId"
        path="/entity-add/:entityId"
        render={(route) => (
            <EntityAddModule permissions={props.permissions} rol={props.rol} entityId={route.match.params.entityId} onNavigate={route.history.push} entityAddStore={props.entityAddStore} uiHook={props.uiHook} />

        )}
    />,
]
