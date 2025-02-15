export interface IListadoComponentes {
    idInsumo: string;
    idDescripcion: number;
    diametro: number;
    diametroNominal: number;
    espesor: number;
    longitud: number;
    altura: number;
    perfil: number;
    tolerancia: string;
    peso: number;
    idFraccionamiento: string;
    idAlmacenamiento: string;
}


interface ICell {
    header: string;
    value: string | number;
    type: "string" | "number";
}

export interface IRow {
    idInsumo: string;
    cellList: ICell[];
}

export interface IRowContainer {
    rowList: IRow[];
}