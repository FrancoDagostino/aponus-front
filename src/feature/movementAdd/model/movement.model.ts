export interface ISuppliesList {
    idInsumo: string,
    nombre: string,
    granallado: number,
    pintura: number,
    proceso: number,
    moldeado: number,
    pendiente: number
}

export interface IEntity {
    apellido: string,
    nombre: string,
    nombreClave: string,
    pais: string,
    provincia: string,
    ciudad: string,
    localidad: string,
    calle: string,
    altura: string,
    codigoPostal: string,
    telefono1: string,
    telefono3: string,
    idFiscal: string,
    fechaRegistro: string,
    idUsuarioRegistro: string,
    idTipo: number,
    idCategoria: number,
    idEntidad: number

}
