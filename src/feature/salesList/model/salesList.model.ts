export interface ISale {
    idVenta: number;
    idCliente: number;
    fechaHora: string;
    idUsuario: string;
    montoTotal: number;
    saldoPendiente: number;
    idEstadoVenta: number;
    estado: {
        descripcion: string;
        idEstado: number;
    };
    cliente: Cliente;
    detallesVenta: IDetallesVenta[];
    pagos: IPago[];
    cuotas: ICuota[];
    infoArchivos: IInfoArchivo[];
}

export interface Cliente {
    apellido: string;
    nombre: string;
    nombreClave: string;
    idFiscal: string;
    idTipo: number;
    idCategoria: number;
    tipo: string;
    categoria: string;
}

export interface ICuota {
    numeroCuota: number;
    monto: number;
    fechaVencimiento: string;
    idEstadoCuota: number;
    fechaPago?: string;
    estadoCuota: IEstadoCuota;
    estado: string;
    idVenta: number;
    idCuota: number;
    pagos: IPago[];
}

export interface IEstadoCuota {
    idEstadoCuota: number;
    descripcion: string;
    idEstado: number;
}

export interface IDetallesVenta {
    idVenta: number;
    idProducto: string;
    nombreProducto: string;
    cantidad: number;
    precio: number;
    subTotal: number;
}

export interface IInfoArchivo {
    idVenta: number;
    idArchivo: number;
    hashArchivo: string;
    pathArchivo: string;
    mimeType: null;
    idEstado: number;
}

export interface IPago {
    idPago: number;
    idVenta: number;
    idMedioPago: number;
    idEntidadPago: number;
    monto: number;
    medioPago: IMedioPago;
}

export interface IMedioPago {
    idMedioPago: number;
    codigoMPago: string;
    descripcion: string;
}
