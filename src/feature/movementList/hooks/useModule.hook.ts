import { useEffect, useState } from "react"
import { IMovementListStore } from "../store/useMovementList.store";
import { IMovimientoStock } from "../model/movementList.model";
import { IUiHook } from "../../ui/hooks/useUi.hook";

export interface IMovementListView {
    idMovement: number,
    type: string;
    date: string;
    userCreation: string;
    userMod: string;
    status: string
    provider: string
}

interface IMovementListProps {
    movementListStore: IMovementListStore;
    uiStore: IUiHook
    onNavigate: (path: string) => void
}

interface IMovementListHook {
    movementListState: IMovementListView[]
    onEditMovementHandler: (id: number) => void
    onViewMovementHandler: (row: IMovimientoStock) => void
    movementViewState: IMovimientoStock
    openModalView: boolean
    onOpenModalView: () => void
    onCloseModalView: () => void
    onNewFileMovementHandler: (file: File, idMovimiento: number) => void
    onDeleteFileHandler: (idMovimiento: string, nombreArchivo: string) => void
}

export const useMovementListHook = (props: IMovementListProps): IMovementListHook => {
    const [movementListState, setMovementListState] = useState<IMovementListView[]>([])
    const [openModalView, setOpenModalView] = useState(false)
    const [movementViewState, setMovementViewState] = useState<IMovimientoStock>({
        idMovimiento: 0,
        usuarioCreacion: "",
        usuarioModificacion: "",
        fechaHoraCreado: "",
        fechaHoraUltimaModificacion: "",
        idProveedorOrigen: 0,
        idProveedorDestino: 0,
        origen: "",
        destino: "",
        tipo: "",
        proveedorDestino: {
            apellido: "",
            nombre: "",
            nombreClave: "",
            idFiscal: "",
            idTipo: 0,
            idCategoria: 0,
            tipo: {},
            categoria: {},
            idEntidad: 0
        },
        Suministros: [],
        infoArchivos: [],
        archivos: [],
        idEstado: 0,
        estado: ""
    })

    useEffect(() => {
        onInit()
    }, [])


    const onInit = async () => {
        const result = await props.movementListStore.getMovementListAction()
        if (result.isError) return;
        const newObj: IMovementListView[] = result.data.map(movement => {
            return {
                idMovement: movement.idMovimiento,
                date: movement.fechaHoraCreado.toString(),
                provider: movement.proveedorDestino.nombre + movement.proveedorDestino.apellido,
                status: movement.estado,
                type: movement.tipo,
                userCreation: movement.usuarioCreacion,
                userMod: movement.usuarioModificacion
            }
        })

        setMovementListState(newObj)
    }

    const onOpenModalView = () => {
        setOpenModalView(true)
    }

    const onCloseModalView = () => {
        setOpenModalView(false)
    }

    const onViewMovementHandler = (row: IMovimientoStock) => {
        console.log(row)
        setMovementViewState(row)
        onOpenModalView()
    }

    const onEditMovementHandler = (id: number) => {
        props.onNavigate(`/movement-add/${id}`)
    }

    const onNewFileMovementHandler = async (file: File, idMovimiento: number) => {
        props.uiStore.showLoading()
        const result = await props.movementListStore.newFileMovementAction(file, idMovimiento)
        props.uiStore.hideLoading()
        if (result.isError) return;
    }

    const onDeleteFileHandler = async (idMovimiento: string, nombreArchivo: string) => {
        props.uiStore.showLoading()
        const result = await props.movementListStore.deleteFileAction(idMovimiento, nombreArchivo)
        props.uiStore.hideLoading()
        if (result.isError) return;
    }
    return {
        movementListState,
        onEditMovementHandler,
        onViewMovementHandler,
        movementViewState,
        openModalView,
        onOpenModalView,
        onCloseModalView,
        onNewFileMovementHandler,
        onDeleteFileHandler
    }

}