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
    barrio?: string;
    telefono1: string;
    telefono2?: string;
    telefono3?: string;
    email?: string;
    idFiscal: string;
    fechaRegistro: string;
    idUsuarioRegistro: string;
    idTipo: number;
    idCategoria: number;
    tipo: Tipo;
    categoria: Categoria;
    idEntidad: number;
}

export interface Categoria {
    idCategoria: number;
    nombreCategoria: string;
}

export interface Tipo {
    idTipo: number;
    nombre: string;
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


