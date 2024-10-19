import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from "../../../utils/response.util";
import { IMovimientoStock } from "../model/movementList.model";


const mockMovimientoStock: IMovimientoStock = {
    idMovimiento: 123,
    usuarioCreacion: "usuario.creador",
    usuarioModificacion: "usuario.modificador",
    fechaHoraCreado: new Date('2024-09-21T10:30:00'),
    fechaHoraUltimaModificacion: new Date('2024-09-22T12:45:00'),
    idProveedorOrigen: 1,
    idProveedorDestino: 2,
    origen: "Almacén Central",
    destino: "Sucursal Norte",
    tipo: "Transferencia",
    proveedorDestino: "Proveedor Destino XYZ",
    proveedorOrigen: "Proveedor Origen ABC",
    suministros: [
        {
            idMovimiento: 123,
            idSuministro: "SUM001",
            nombreSuministro: "Suministro A",
            valorAnteriorOrigen: "50",
            valorAnteriorDestino: "10",
            valorNuevoOrigen: "30",
            valorNuevoDestino: "30",
            cantidad: "20"
        },
        {
            idMovimiento: 123,
            idSuministro: "SUM002",
            nombreSuministro: "Suministro B",
            valorAnteriorOrigen: "100",
            valorAnteriorDestino: "20",
            valorNuevoOrigen: "80",
            valorNuevoDestino: "40",
            cantidad: "20"
        }
    ],
    infoArchivos: [
        {
            idMovimiento: 123,
            nombreArchivo: "guia_envio.pdf",
            path: "/docs/guia_envio.pdf",
            mimeType: "application/pdf",
            extension: ".pdf",
            datosArchivo: Promise.resolve(new ArrayBuffer(8)) // Simulando datos binarios
        }
    ],
    archivos: [
        new File(["contenido del archivo"], "informe_transferencia.pdf", { type: "application/pdf" })
    ],
    idEstado: 1,
    estado: "Pendiente"
};


export interface IMovementListServiceProps {
    restClient: IRestClient
}

export interface IMovementListService {
    getMovementList: () => Promise<TResponse<IMovimientoStock[], null>>
}

export const useMovementListService = (props: IMovementListServiceProps): IMovementListService => {

    const getMovementList: IMovementListService["getMovementList"] = async () => {
        // const url = `${urlBase}/Movments/List`
        // const response = await props.restClient.get<IMovimientoStock[], null>(url, undefined)
        // if (response.isSuccess) return createResponseUtil.success(response.data, response.status)
        // return createResponseUtil.error(response.data, response.status)
        props
        urlBase
        const objtResponse = {
            status: 200,
            isError: false,
            isSuccess: true,
            data: [mockMovimientoStock]
        }

        if (objtResponse.isSuccess) return createResponseUtil.success(objtResponse.data, objtResponse.status)
        return createResponseUtil.error(null, objtResponse.status)
    }

    return {
        getMovementList
    }
}
