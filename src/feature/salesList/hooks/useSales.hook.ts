import { useEffect, useState } from "react"
import { ISalesListStore } from "../store/useSalesList.store"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { ISale } from "../model/salesList.model"



interface ISalesListHookProps {
    salesListStore: ISalesListStore
    uiHook: IUiHook
}

interface ISalesListHook {
    salesList: ISale
    onViewSale: (row: ISale) => void
    onCloseViewSales: () => void
    isOpenViewSales: boolean
    onDeleteFileHandler: (idVenta: string, hashArchivo: string) => void
    onSaveFileHandler: (idVenta: string, file: File) => void
    onPayHandler: (idVenta: string, numeroCuota: number) => void
}

export const useSalesLIstHook = (props: ISalesListHookProps): ISalesListHook => {
    const [isOpenViewSales, setIsOpenViewSales] = useState<boolean>(false)

    const [salesList, setSalesList] = useState<ISale>({
        idVenta: 0,
        fechaHora: "",
        cliente: {
            nombre: "",
            apellido: "",
            nombreClave: "",
            categoria: "",
            idCategoria: 0,
            idFiscal: " ",
            idTipo: 0,
            tipo: ""
        },
        saldoPendiente: 0,
        montoTotal: 0,
        pagos: [],
        idCliente: 0,
        idUsuario: "",
        idEstadoVenta: 0,
        detallesVenta: [],
        cuotas: [],
        infoArchivos: []
    })

    useEffect(() => {
        props.salesListStore.getSalesListAction()
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.salesListStore.getSalesListAction()
        props.uiHook.hideLoading()
    }
    const onViewSale = (row: ISale) => {
        console.log(row)
        setSalesList(row)
        setIsOpenViewSales(true)
    }

    const onCloseViewSales = () => {
        setIsOpenViewSales(false)
    }

    const onDeleteFileHandler = async (idVenta: string, hashArchivo: string) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.removeFileAction(idVenta, hashArchivo)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar el archivo",
                type: "alert",
            })
        }
    }

    const onSaveFileHandler = async (idVenta: string, file: File) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.saveFileAction(idVenta, file)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al guardar el archivo",
                type: "alert",
            })
        }
    }

    const onPayHandler = async (idVenta: string, numeroCuota: number) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.payCuotaAction(idVenta, numeroCuota)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al pagar la cuota",
                type: "alert",
            })
        }
    }





    return {
        salesList,
        onViewSale,
        onCloseViewSales,
        isOpenViewSales,
        onDeleteFileHandler,
        onSaveFileHandler,
        onPayHandler
    }
}