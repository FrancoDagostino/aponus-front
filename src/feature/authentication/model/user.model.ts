// interface INacionalidad {
//     id: number,
//     nombre: string
// }

// interface IDomicilio {
//     id: number,
//     idCliente: number,
//     calle: string,
//     nroPuerta: string,
//     piso: number,
//     depto: string,
//     barrio: string,
//     localidad: string,
//     codigoPostal: number
// }

// interface IRolUsuario {
//     id: number,
//     nombreRol: string
// }

// interface IUser {
//     id: number,
//     usernameSistema: string,
//     userName: string,
//     apellido: string,
//     telefono: string,
//     password: string,
//     cargo: string,
//     domicilio: IDomicilio,
//     cambiarClave: boolean,
//     fechaUltimoCambioClave: Date,
//     nacionalidad: INacionalidad,
//     rolUsuario: any
// }

export interface IUser {
    token: string;
    rol: string;
}