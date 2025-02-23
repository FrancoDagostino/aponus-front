export interface IListadoCategorias {
    idTipo: string;
    descripcionTipo: string;
    productos: any[];
}

export interface IListadoDescripciones {
    idDescripcion: number;
    nombreDescripcion: string;
}


export interface IComponentDescription {
    idDescripcion: string;
    nombreDescripcion: string;
    idAlmacenamiento: string;
    idFraccionamiento: string;
}