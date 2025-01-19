import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IProviderList } from "../../movementAdd/hooks/useModule.hook"
import { SelectChangeEvent } from "@mui/material"
import { IMovementAddStore } from "../../movementAdd/store/useMovementAdd.store"
import { ISalesAddStore } from "../store/useSalesAdd.store"

export interface ISupplyItem {
    id: string;
    name: string;
    quantity: string;
    mont: number
}
interface IPurchaseAddHookProps {
    uiHook: IUiHook
    salesAddStore: ISalesAddStore
    movementAddStore: IMovementAddStore;
}

export interface IFormData {
    idProvider: number;
    idBilling: number,
    idStateSales: number
    totalMont: number,
    mont: number,
    parcialMont: number,
    supplyItem: ISupplyItem[]
    idPaymentMethod: number,
    quantityCuote: number
    interest: number
    files: File[];
}

interface ISalesAddHook {
    purchaseDataState: IFormData
    providerList: IProviderList[]
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onChangePurchaseDateHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    onChangeCheckboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    onAddInputFilesHanlder: (files: File[]) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onSaveHandler: () => void
    handleDeleteSupply: (id: string) => void
}


export const useSalesAddHook = (props: IPurchaseAddHookProps): ISalesAddHook => {
    const [providerList, setProviderList] = useState<IProviderList[]>([])

    const [purchaseDataState, setPurchaseDataState] = useState<IFormData>({
        idProvider: 0,
        idStateSales: 1,
        interest: 0,
        idBilling: 0,
        quantityCuote: 0,
        parcialMont: 0,
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
        await props.salesAddStore.productListAction()
        props.uiHook.hideLoading()

        const result = await props.movementAddStore.getEntityListAction()

        if (result.isError) return

        props.uiHook.showLoading()
        await props.salesAddStore.billingListAction()
        props.uiHook.hideLoading()

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

        const total = supplyItem.reduce((sum, item) => {
            return sum + item.mont * parseInt(item.quantity, 10);
        }, 0);

        setPurchaseDataState({
            ...purchaseDataState,
            totalMont: total
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

    const handleDeleteSupply = (id: string) => {
        const supplyItemsFound = purchaseDataState.supplyItem.filter(supply => supply.id !== id)
        const total = supplyItemsFound.reduce((sum, item) => {
            return sum + item.mont * parseInt(item.quantity, 10);
        }, 0);

        setPurchaseDataState({
            ...purchaseDataState,
            totalMont: total
        })
    }

    const onSaveHandler = async () => {
        const objPurchase: any = {
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
        objPurchase
        props.uiHook.showLoading()
        // await props.purchaseAddStore.createPurchaseAction(objPurchase, purchaseDataState.ready, purchaseDataState.files)
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
        onSaveHandler,
        handleDeleteSupply
    }
}