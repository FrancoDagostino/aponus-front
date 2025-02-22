export interface IMovimientoStock {
    idMovimiento: number;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaHoraCreado: string;
    fechaHoraUltimaModificacion?: string;
    idProveedorOrigen: number;
    idProveedorDestino: number;
    origen: string;
    destino: string;
    tipo: string;
    proveedorDestino: IProveedorDestino;
    Suministros: ISuministrosMovimientosStock[];
    infoArchivos: IDatosArchivosMovimientosStock[];
    archivos: File[];
    idEstado: number;
    estado: string;
}

interface IProveedorDestino {
    apellido: string,
    nombre: string,
    nombreClave: string,
    idFiscal: string,
    idTipo: number,
    idCategoria: number,
    tipo: {},
    categoria: {},
    idEntidad: number
}

export interface ISuministrosMovimientosStock {
    idMovimiento: number;
    idSuministro: string;
    nombreSuministro: string;
    valorAnteriorOrigen: string;
    valorAnteriorDestino: string;
    valorNuevoOrigen: string;
    valorNuevoDestino: string;
    cantidad: string;
}

export interface IDatosArchivosMovimientosStock {
    idMovimiento: number;
    nombreArchivo: string;
    path: string;
    mimeType: string;
    Extension: string;
}
