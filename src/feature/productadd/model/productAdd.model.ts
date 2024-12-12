export interface IStorageSupplie {
    idDescripcion: number,
    descripcion: string,
    idAlmacenamiento: string
    idFraccionamiento: string
}

export interface ISupplie {
    idInsumo: string,
    nombre: string
}

export interface IProductType {
    idTipo: string,
    descripcionTipo: string,
    descripcionProductos: Array<string>
}

export interface IProductDescription {
    idDescripcion: string
    nombreDescripcion: string
}

export interface IProduct {
    idTipo: string;
    idProducto: string;
    idDescripcion: number;
    diametroNominal: number;
    tolerancia: string;
    cantidad: number;
}

export interface IProductWithComponent {
    idProducto: string;
    componentes: IComponent[];
}

export interface IComponent {
    idComponente: string;
    descripcion: string;
    tolerancia: string;
    stockFormateado: IStockFormated[];
}

export interface IStockFormated {
    idInsumo: string;
    NombreInsumo: string;
    recibido: string;
    granallado: string;
    pintura: string;
    proceso: string;
    moldeado: string;
    requerido: string;
    total: string;
}
