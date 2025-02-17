export interface IAuditoria {
    idAuditoria: number;
    tabla: string;
    idRegistro: string;
    accion: string;
    usuario: string;
    fecha: string;
    valoresPrevios: string;
    valoresNuevos: string;
}
