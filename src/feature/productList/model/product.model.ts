export interface IListadoComponentes {
    idProducto: string;
    componentes: IComponente[];
}

export interface IComponente {
    idComponente: string;
    descripcion: string;
    stockFormateado: IStockFormateado[];
}

export interface IStockFormateado {
    idInsumo: string;
    requerido: string;
    recibido?: string;
    pintura?: string;
    proceso: string;
    total: string;
    granallado?: string;
    moldeado?: string;
}

export interface IListadoPadre {
    idTipo: string,
    descripcionTipo: string
    descripcionProductos: IListadoProducto[]
}

export interface IListadoProducto {
    idDescripcion: number;
    descripcionProducto: string;
    productos: Producto[];
}

export interface Producto {
    idProducto: string;
    idDescripcion: number;
    idTipo: string;
    diametroNominal: number;
    tolerancia: string;
    cantidad: number;
    precioLista: number;
    precioFinal: number | null;
    porcentajeGanancia: number | null;
    idDescripcionNavigation: null;
    idTipoNavigation: null;
    componentesCuantitativos: any[];
}
