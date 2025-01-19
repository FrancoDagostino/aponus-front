export interface IEntity {
    apellido: string;
    nombre: string;
    nombreClave: string;
    pais: string;
    provincia: string;
    ciudad: string;
    localidad: string;
    calle: string;
    altura: string;
    codigoPostal: string;
    telefono1: string;
    telefono2: string;
    email: string;
    barrio: string;
    telefono3: string;
    idFiscal: string;
    fechaRegistro: string;
    idUsuarioRegistro: string;
    idTipo: number;
    idCategoria: number;
    tipo: { idTipo: number, nombre: string };
    categoria: { idCategoria: number, nombreCategoria: string };
    idEntidad: number;
}