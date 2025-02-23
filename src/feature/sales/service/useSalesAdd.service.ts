import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IBilling, IProduct, IQuatationList } from "../model/sales.model";

export interface IVentaPost {
    idCliente: string,
    montoTotal: number,// caja de texto con el monto total
    saldoPendiente: number
    idEstadoVenta: number
    detallesVenta: Array<{
        idProducto: string,
        cantidad: number,
        entregados: number,
        precio: number
    }>,// fijarse en pantalla dodne agregar insumos
    pagos: Array<{
        idMedioPago: number,
        idEntidadPago: number,
        monto: number,
    } | null>
    cuotas: IQuatationList[],
    archivos: File[]
}

export interface ISalesAddServiceProps {
    restClient: IRestClient
}

export interface IQuotation {
    cantidadCuotas: number,
    montoVenta: number,
    interes: number,
    idEntidad: number
}


export interface ISalesAddService {
    createPurchase: (inputData: IVentaPost, files: File[]) => Promise<TResponse<null, null>>
    billingList: () => Promise<TResponse<IBilling[], null>>;
    productList: () => Promise<TResponse<IProduct[], null>>
    getQuotation: (inputData: IQuotation) => Promise<TResponse<IQuatationList[], null>>
}

export const useSalesAddService = (props: ISalesAddServiceProps): ISalesAddService => {



    const billingList = async () => {
        const url = `${urlBase}/Entities/Billing/List`;
        const response = await props.restClient.get<IBilling[], null>(url, undefined);
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const productList = async () => {
        const url = `${urlBase}/Sales/Products/List`
        const response = await props.restClient.get<IProduct[], null>(url, undefined);
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    const createPurchase = async (inputData: IVentaPost, files: File[]) => {
        const url = `${urlBase}/Sales/Save`;
        const response = await props.restClient.post<null, null>(url, inputData, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        const urlMovments = `${urlBase}/Movments/new`;

        const formData = new FormData();
        formData.append("idCliente", inputData.idCliente);
        inputData.detallesVenta.forEach(item => {
            formData.append("suministros[]", JSON.stringify({
                idSuministro: item.idProducto,
                cantidad: item.cantidad
            }));
        });

        files.forEach(file => {
            formData.append("archivos", file);
        });
        const responseMovments = await props.restClient.post<null, null>(urlMovments, formData, undefined);
        if (responseMovments.isSuccess) return createResponseUtil.success(responseMovments.data, responseMovments.status);
        return createResponseUtil.error(responseMovments.data, responseMovments.status);
    }

    const getQuotation = async (inputData: IQuotation) => {
        const url = `${urlBase}/Sales/Quotation`;
        const response = await props.restClient.post<IQuatationList[], null>(url, inputData, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        return createResponseUtil.success(response.data, response.status)
    }

    return {
        createPurchase,
        productList,
        billingList,
        getQuotation
    }
}