import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";

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


export interface IPurchaseAddServiceProps {
    restClient: IRestClient
}

export interface IPurchaseAddService {
    createPurchase: (inputData: ICompraPost, receivedMerchandise: boolean, files: File[]) => Promise<TResponse<null, null>>
}

export const usePurchaseAddService = (props: IPurchaseAddServiceProps): IPurchaseAddService => {


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
        createPurchase
    }
}