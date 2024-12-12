import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IPurchaseListStore as IPurchaseListStore } from "../store/usePurcharseList.store"
import { ICompras } from "../../entityList/model/EntityList.model"


interface IPurchaseListHookProps {
    uiHook: IUiHook
    purchaseListStore: IPurchaseListStore
}


interface IPurchaseListHook {
    onViewPurchase: (row: ICompras) => void
    onRemovePurchase: (id: string) => void
    purchaseState: ICompras
}


export const usePurchaseListHook = (props: IPurchaseListHookProps): IPurchaseListHook => {

    const [purchaseState, setPurchaseState] = useState<ICompras>({
        fechaHora: "",
        idCompra: "0",
        insumo: [],
        pagos: [],
        proveedor: {
            apellido: "",
            idProveedor: "0",
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

    const onViewPurchase = (row: ICompras) => {
        setPurchaseState(row)
    }

    const onRemovePurchase = (id: string) => {
        id
    }

    return {
        purchaseState,
        onViewPurchase,
        onRemovePurchase
    }
}   