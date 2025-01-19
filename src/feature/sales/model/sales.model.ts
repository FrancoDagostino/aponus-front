export interface IBilling {
    idEntidad: number;
    tipo: string;
    descripcion: string;
    emisor: string;
}

export interface IProduct {
    nombre: string
    idProducto: string;
    idDescripcion: number;
    idTipo: string;
    diametroNominal: number;
    tolerancia: string;
    cantidad: number;
    precioLista: number;
    precioFinal: number;
    porcentajeGanancia: number;
    idEstado: number;
    idDescripcionNavigation: null;
    idTipoNavigation: null;
    idEstadoNavigation: number;
    ventas: null;
}