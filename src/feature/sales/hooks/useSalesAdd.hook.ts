import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IProviderList } from "../../movementAdd/hooks/useModule.hook"
import { SelectChangeEvent } from "@mui/material"
import { IMovementAddStore } from "../../movementAdd/store/useMovementAdd.store"
import { ISalesAddStore } from "../store/useSalesAdd.store"
import { IQuotation, IVentaPost } from "../service/useSalesAdd.service"

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
    onClickQuotationHandler: () => void
}


export const useSalesAddHook = (props: IPurchaseAddHookProps): ISalesAddHook => {
    const [providerList, setProviderList] = useState<IProviderList[]>([])

    const [salesDataState, setSalesDataState] = useState<IFormData>({
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

        const result = await props.movementAddStore.getEntityListAction("1")

        if (result.isError) return

        props.uiHook.showLoading()
        await props.salesAddStore.billingListAction()
        props.uiHook.hideLoading()


        console.log(result.data)


        setProviderList(result.data.map(provider => {
            return {
                id: provider.idEntidad,
                name: `${provider.nombre} ${provider.apellido}`
            }
        }))

        setSalesDataState({
            ...salesDataState,
            idProvider: result.data[0].idEntidad
        })
    }


    const onChangePurchaseDateHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { value, name } = event.target
        setSalesDataState({
            ...salesDataState,
            [name]: value,
        })
    }

    const onChangeCheckboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = event.target;
        setSalesDataState({
            ...salesDataState,
            [name]: checked,
        });
    };

    const onAddSupplyItemHandler = (supplyItem: ISupplyItem[]) => {
        const total = supplyItem.reduce((sum, item) => {
            return sum + item.mont * parseInt(item.quantity, 10);
        }, 0);
        setSalesDataState({
            ...salesDataState,
            supplyItem,
            totalMont: total
        })
    }

    const onAddInputFilesHanlder = (files: File[]) => {
        setSalesDataState(prevData => ({
            ...prevData,
            files: [...prevData.files, ...files]
        }))
    }

    const onRemoveFileHandler = (fileToDelete: File) => {
        setSalesDataState(prevData => ({
            ...prevData,
            files: prevData.files.filter(file => file !== fileToDelete)
        }))


    }

    const handleDeleteSupply = (id: string) => {
        const supplyItemsFound = salesDataState.supplyItem.filter(supply => supply.id !== id)
        const total = supplyItemsFound.reduce((sum, item) => {
            return sum + item.mont * parseInt(item.quantity, 10);
        }, 0);

        setSalesDataState({
            ...salesDataState,
            totalMont: total
        })
    }

    const onSaveHandler = async () => {
        const objPurchase: IVentaPost = {
            idCliente: "2",
            idEstadoVenta: salesDataState.idStateSales,
            detallesVenta: salesDataState.supplyItem.map(item => (
                {
                    cantidad: Number(item.quantity),
                    idProducto: item.id,
                    entregados: 0,
                    precio: item.mont
                }
            )),
            pagos: [{
                idMedioPago: salesDataState.idPaymentMethod,
                monto: salesDataState.mont,
                idEntidadPago: 1
            }],
            montoTotal: salesDataState.totalMont,
            saldoPendiente: salesDataState.totalMont - salesDataState.mont,
            cuotas: props.salesAddStore.quatationList,
            archivos: salesDataState.files
        }
        props.uiHook.showLoading()
        await props.salesAddStore.createSalesAction(objPurchase, salesDataState.files)
        props.uiHook.hideLoading()
    }

    const onClickQuotationHandler = () => {
        const objQuotation: IQuotation = {
            cantidadCuotas: salesDataState.quantityCuote,
            montoVenta: salesDataState.totalMont,
            interes: salesDataState.interest,
            idEntidad: salesDataState.idBilling
        }
        props.uiHook.showLoading()
        props.salesAddStore.getQuotationAction(objQuotation)
        props.uiHook.hideLoading()
    }

    return {
        purchaseDataState: salesDataState,
        providerList,
        onAddSupplyItemHandler,
        onChangePurchaseDateHandler,
        onChangeCheckboxHandler,
        onAddInputFilesHanlder,
        onRemoveFileHandler,
        onSaveHandler,
        handleDeleteSupply,
        onClickQuotationHandler
    }
}