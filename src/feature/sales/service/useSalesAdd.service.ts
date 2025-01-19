import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IBilling, IProduct } from "../model/sales.model";

export interface ICompraPost {
    idProveedor: string,

    idUsuario: string,
    montoTotal: number,// caja de texto con el monto total
    saldoPendiente: number
    detallesCompra: Array<{
        idInsumo: string,
        cantidad: number
    }>,// fijarse en pantalla dodne agregar insumos
    pagos: Array<{
        idMedioPago: number,
        idEntidadPago: number,
        monto: number,
    }>
}

export interface ISalesAddServiceProps {
    restClient: IRestClient
}

export interface ISalesAddService {
    createPurchase: (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => Promise<TResponse<null, null>>
    billingList: () => Promise<TResponse<IBilling[], null>>;
    productList: () => Promise<TResponse<IProduct[], null>>
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

    const createPurchase = async (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => {
        const url = `${urlBase}/Purchase/Save`;
        const response = await props.restClient.post<null, null>(url, inputData, undefined)
        if (response.isError) return createResponseUtil.error(response.data, response.status)
        const urlMovments = `${urlBase}/Movments/new`;

        const formData = new FormData();
        formData.append("usuarioCreacion", inputData.idUsuario);
        formData.append("destino", `${receivedMerchandise ? "recibido" : "pendiente"}`);
        formData.append("idProveedorDestino", inputData.idProveedor);
        inputData.detallesCompra.forEach(item => {
            formData.append("suministros[]", JSON.stringify({
                idSuministro: item.idInsumo,
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

    return {
        createPurchase,
        productList,
        billingList
    }
}