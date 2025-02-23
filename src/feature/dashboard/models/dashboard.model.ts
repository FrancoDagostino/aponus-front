export interface IPendingSales {
    cliente: string;
    fecha: string;
    usuario: string;
    montoTotal: number;
    saldoPendiente: number;
    estado: string;
}


export interface IProducts {
    cantidad: number;
    tolerancia: string;
    precioLista: number;
    diametroNominal: number;
    tipo: string;
    descripcion: string;
}

export interface IDescriptions {
    idDescripcion: number;
    nombreDescripcion: string;
    idAlmacenamiento: string;
    idFraccionamiento: string;
}


export interface ISalesForMonth {
    month: string;
    ventas: string;
}