import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IPurchaseAddStore } from "../store/usePurchaseAdd.store"
import { IProviderList, ISupplyItem } from "../../movementAdd/hooks/useModule.hook"
import { SelectChangeEvent } from "@mui/material"
import { IMovementAddStore } from "../../movementAdd/store/useMovementAdd.store"
import { ICompraPost } from "../service/usePurchaseAdd.service"


interface IPurchaseAddHookProps {
    uiHook: IUiHook
    purchaseAddStore: IPurchaseAddStore
    movementAddStore: IMovementAddStore;
}

export interface IFormData {
    idProvider: number;
    totalMont: number,
    mont: number,
    parcialMont: number,
    supplyItem: ISupplyItem[]
    idPaymentMethod: number,
    files: File[];
    ready: boolean
}

interface IPurchaseAddHook {
    purchaseDataState: IFormData
    providerList: IProviderList[]
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onChangePurchaseDateHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    onChangeCheckboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    onAddInputFilesHanlder: (files: File[]) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onSaveHandler: () => void
}


export const usePurchaseAddHook = (props: IPurchaseAddHookProps): IPurchaseAddHook => {
    const [providerList, setProviderList] = useState<IProviderList[]>([])

    const [purchaseDataState, setPurchaseDataState] = useState<IFormData>({
        idProvider: 0,
        parcialMont: 0,
        ready: false,
        supplyItem: [],
        totalMont: 0,
        idPaymentMethod: 1,
        mont: 0,
        files: []
    })

    useEffect(() => {
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.movementAddStore.getSupplyListAction()
        props.uiHook.hideLoading()

        const result = await props.movementAddStore.getEntityListAction("1")

        if (result.isError) return

        setProviderList(result.data.map(provider => {
            return {
                id: provider.idEntidad,
                name: `${provider.nombre} ${provider.apellido}`
            }
        }))

        setPurchaseDataState({
            ...purchaseDataState,
            idProvider: result.data[0].idEntidad
        })
    }


    const onChangePurchaseDateHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { value, name } = event.target
        setPurchaseDataState({
            ...purchaseDataState,
            [name]: value,
        })
    }

    const onChangeCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = event.target;
        setPurchaseDataState({
            ...purchaseDataState,
            [name]: checked,
        });
    };

    const onAddSupplyItemHandler = (supplyItem: ISupplyItem[]) => {
        setPurchaseDataState({
            ...purchaseDataState,
            supplyItem
        })
    }

    const onAddInputFilesHanlder = (files: File[]) => {
        setPurchaseDataState(prevData => ({
            ...prevData,
            files: [...prevData.files, ...files]
        }))
    }

    const onRemoveFileHandler = (fileToDelete: File) => {
        setPurchaseDataState(prevData => ({
            ...prevData,
            files: prevData.files.filter(file => file !== fileToDelete)
        }))
    }

    const onSaveHandler = async () => {
        const objPurchase: ICompraPost = {
            idProveedor: purchaseDataState.idProvider.toString(),
            detallesCompra: purchaseDataState.supplyItem.map(item => (
                {
                    cantidad: Number(item.quantity),
                    idInsumo: item.id,
                }
            )),
            pagos: [{
                idMedioPago: purchaseDataState.idPaymentMethod,
                monto: purchaseDataState.mont,
                idEntidadPago: 1
            }],
            montoTotal: purchaseDataState.totalMont,
            idUsuario: "administrador",
            saldoPendiente: purchaseDataState.totalMont - purchaseDataState.mont
        }

        props.uiHook.showLoading()
        await props.purchaseAddStore.createPurchaseAction(objPurchase, purchaseDataState.ready, purchaseDataState.files)
        props.uiHook.hideLoading()
    }
    return {
        purchaseDataState,
        providerList,
        onAddSupplyItemHandler,
        onChangePurchaseDateHandler,
        onChangeCheckboxHandler,
        onAddInputFilesHanlder,
        onRemoveFileHandler,
        onSaveHandler
    }
}   