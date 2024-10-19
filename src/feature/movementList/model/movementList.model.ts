export interface IMovimientoStock {
    idMovimiento: number;
    usuarioCreacion: string;
    usuarioModificacion: string;
    fechaHoraCreado: Date;
    fechaHoraUltimaModificacion?: Date;
    idProveedorOrigen: number;
    idProveedorDestino: number;
    origen: string;
    destino: string;
    tipo: string;
    proveedorDestino: string;
    proveedorOrigen: string;
    suministros: ISuministrosMovimientosStock[];
    infoArchivos: IDatosArchivosMovimientosStock[];
    archivos: File[];
    idEstado: number;
    estado: string;
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
    extension: string;
    datosArchivo: Promise<ArrayBuffer>;
}
