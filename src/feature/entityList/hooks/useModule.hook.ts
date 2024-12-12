import { useEffect, useState } from "react";
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { IEntityListStore } from "../store/useEntityList.store";
import { IEntity } from "../model/EntityList.model";


interface IEntityListHookProps {
    entityListStore: IEntityListStore
    uiHook: IUiHook
    onNavigate: (url: string) => void
}

interface IEntityListHook {
    entityState: IEntity
    isOpen: boolean
    onViewEntityHandler: (row: IEntity) => void
    handleClose: () => void
    onRemoveEntityHandler: (id: number) => void
    onEditEntityHandler: (id: number) => void
}

export const useEntityListHook = (props: IEntityListHookProps): IEntityListHook => {

    const [isOpen, setIsOpen] = useState(false);
    const [entityState, setEntityState] = useState<IEntity>({
        altura: "",
        apellido: "",
        calle: "",
        ciudad: "",
        codigoPostal: "",
        fechaRegistro: "",
        idCategoria: 0,
        idEntidad: 0,
        idFiscal: "",
        idTipo: 0,
        idUsuarioRegistro: "",
        localidad: "",
        nombre: "",
        nombreClave: "",
        pais: "",
        provincia: "",
        telefono1: "",
        telefono3: ""
    })

    useEffect(() => {
        onInit()
    }, [])

    const onInit = async () => {
        props.uiHook.showLoading()
        await props.entityListStore.getEntityListAction()
        props.uiHook.hideLoading()
    }

    const onViewEntityHandler: IEntityListHook["onViewEntityHandler"] = (row: IEntity) => {
        setEntityState({ ...row })
        setIsOpen(true)
    }


    const onEditEntityHandler = (id: number) => {
        props.onNavigate(`entity-add/${id}`)
    }
    const handleClose = () => setIsOpen(false);

    const onRemoveEntityHandler = (id: number) => {
        props.entityListStore.deleteEntityByIdAction(id)
    }

    return {
        entityState,
        isOpen,
        handleClose,
        onViewEntityHandler,
        onRemoveEntityHandler,
        onEditEntityHandler
    }
}