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





    return {
        salesList,
        onViewSale,
        onCloseViewSales,
        isOpenViewSales
    }
}