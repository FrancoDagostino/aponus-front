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


// fechaHora, usuario, Proveedor, saldoPediente, saldoTotal,  acciones : ver

export interface ICompras {
    idCompra: string,
    insumo: Array<{ // llamar al endpoint listFormated y buscar por id el nombre
        id: string,
        nombreInsumo: string
        cantidad: number
    }>,
    pagos: Array<{
        idPago: string,
        idMedioDepago: string, // 1tarjeta; 2efectivo; 3transferencia;
        monto: number
        fecha: string,
    }>
    proveedor: {
        idProveedor: string,
        nombre: string,
        apellido: string,
        nombreClave: string
    },
    fechaHora: string
    saldoPendiente: number,
    montoTotal: number
}


export interface ICompraPost {
    idProveedor: string, // dropdown listasdo de proveedores
    nombreUsuario: string,
    montoTotal: number,// caja de texto con el monto total
    medioDePago: number,// dropdown donde mostrar medio de pago
    insumo: Array<{
        id: string,
        nombreInsumo: string
        cantidad: number
    }>,// fijarse en pantalla dodne agregar insumos
    entregaDeMercaderia: boolean //checkbox si es true en destino mandar recibido //Movimientos si es false pendiente
}
