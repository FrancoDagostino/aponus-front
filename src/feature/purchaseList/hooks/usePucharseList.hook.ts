import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IPurchaseListStore as IPurchaseListStore } from "../store/usePurcharseList.store"
import { IPucharse } from "../model/pucharseList.model"


interface IPurchaseListHookProps {
    uiHook: IUiHook
    purchaseListStore: IPurchaseListStore
}


interface IPurchaseListHook {
    onViewPurchase: (row: IPucharse) => void
    onRemovePurchase: (id: string) => void
    onCloseViewPucharse: () => void
    purchaseState: IPucharse
    isOpenViewPucharse: boolean
    onSaveFile: (idCompra: string, file: File) => Promise<void>
    onRemoveFile: (idCompra: string, hashArchivo: string) => Promise<void>
}


export const usePurchaseListHook = (props: IPurchaseListHookProps): IPurchaseListHook => {
    const [isOpenViewPucharse, setIsOpenViewPucharse] = useState<boolean>(false)
    const [purchaseState, setPurchaseState] = useState<IPucharse>({
        fechaHora: "",
        idCompra: 0,
        cuotas: [],
        detallesCompra: [],
        estado: { descripcion: '', idEstadoCompra: 0 },
        idProveedor: 0,
        idUsuario: "0",
        saldoCancelado: 0,
        usuario: "",
        pagos: [],
        proveedor: {
            apellido: "",
            categoria: "",
            idCategoria: 0,
            idEntidad: 0,
            idFiscal: "0",
            idTipo: 0,
            tipo: '',
            nombre: "",
            nombreClave: ""
        },
        saldoPendiente: 0,
        montoTotal: 0
    })

    useEffect(() => {
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.purchaseListStore.getPurchaseListAction()
        props.uiHook.hideLoading()
    }

    const onViewPurchase = (row: IPucharse) => {
        setPurchaseState(row)
        setIsOpenViewPucharse(true)
    }

    const onCloseViewPucharse = () => {
        setIsOpenViewPucharse(false)
    }

    const onRemovePurchase = (id: string) => {
        id
    }


    const onSaveFile = async (idCompra: string, file: File) => {
        props.uiHook.showLoading()
        const result = await props.purchaseListStore.saveFileAction(idCompra, file)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al guardar el archivo",
                type: "alert",
            })
        }
    }

    const onRemoveFile = async (idCompra: string, hashArchivo: string) => {
        props.uiHook.showLoading()
        const result = await props.purchaseListStore.removeFileAction(idCompra, hashArchivo)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar el archivo",
                type: "alert",
            })
        }
    }

    return {
        purchaseState,
        isOpenViewPucharse,
        onViewPurchase,
        onRemovePurchase,
        onCloseViewPucharse,
        onSaveFile,
        onRemoveFile
    }
}   