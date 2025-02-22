import { IMovementListService } from "../service/useMovementList.service"
import { IMovimientoStock } from "../model/movementList.model"
import { createResultUtil, TResult } from "../../../utils/result.util"
import { useState } from "react"



export interface IMovementListStore {
    getMovementListAction: () => Promise<TResult<IMovimientoStock[], null>>
    newFileMovementAction: (file: File, idMovimiento: number) => Promise<TResult<null, null>>
    deleteFileAction: (idMovimiento: string, nombreArchivo: string) => Promise<TResult<null, null>>
    movementList: IMovimientoStock[]
}

export interface IMovementListStoreProps {
    movementListService: IMovementListService

}

export const useMovementListStore = (props: IMovementListStoreProps): IMovementListStore => {

    const [movementList, setMovementList] = useState<IMovimientoStock[]>([])

    const getMovementListAction: IMovementListStore["getMovementListAction"] = async () => {

        const result = await props.movementListService.getMovementList()
        if (result.isError) return createResultUtil.error(null)
        setMovementList(result.data)
        return createResultUtil.success(result.data)
    }

    const newFileMovementAction: IMovementListStore["newFileMovementAction"] = async (file, idMovimiento) => {
        const result = await props.movementListService.newFileMovement(file, idMovimiento)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const deleteFileAction: IMovementListStore["deleteFileAction"] = async (idMovimiento, nombreArchivo) => {
        const result = await props.movementListService.deleteFile(idMovimiento, nombreArchivo)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    return {
        getMovementListAction,
        newFileMovementAction,
        deleteFileAction,
        movementList
    }
}
