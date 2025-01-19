import { useEffect, useState } from "react"
import { IMovementListStore } from "../store/useMovementList.store";


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
}

interface IMovementListHook {
    movementListState: IMovementListView[]
    onEditMovementHandler: (id: number) => void

}

export const useMovementListHook = (props: IMovementListProps): IMovementListHook => {
    const [movementListState, setMovementListState] = useState<IMovementListView[]>([])



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


    const onEditMovementHandler = (id: number) => {
        id
    }
    return {
        movementListState,
        onEditMovementHandler
    }

}