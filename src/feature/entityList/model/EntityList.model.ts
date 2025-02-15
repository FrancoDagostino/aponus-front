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
    telefono3: string;
    idFiscal: string;
    fechaRegistro: string;
    idUsuarioRegistro: string;
    idTipo: number;
    idCategoria: number;
    idEntidad: number;
}

export interface ICountries {
    geonames: IGeoname[];
}

export interface IGeoname {
    countryName: string;
    countryCode: string;
    geonameId: number;
}

export interface IGeoProvice {
    toponymName: string;
    geonameId: string;
    countryCode: string;
    adminCode1: string;
}


export interface IGeoCity {
    geonames: IGeonameCity[];
}

export interface IGeonameCity {
    toponymName: string;
    countryCode: string;
    adminCode1: string;
    geonameId: string;
}



// fechaHora, usuario, Proveedor, saldoPediente, saldoTotal,  acciones : ver


