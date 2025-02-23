// export interface IPucharse {
//     idCompra: string,
//     insumo: Array<{ // llamar al endpoint listFormated y buscar por id el nombre
//         id: string,
//         nombreInsumo: string
//         cantidad: number
//     }>,
//     pagos: Array<{
//         idPago: string,
//         idMedioDepago: string, // 1tarjeta; 2efectivo; 3transferencia;
//         monto: number
//         fecha: string,
//     }>
//     proveedor: {
//         idProveedor: string,
//         nombre: string,
//         apellido: string,
//         nombreClave: string
//     },
//     fechaHora: string
//     saldoPendiente: number,
//     montoTotal: number
// }


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







export interface IPucharse {
    idCompra: number;
    idProveedor: number;
    fechaHora: string;
    idUsuario: string;
    montoTotal: number;
    saldoPendiente: number;
    saldoCancelado: number;
    usuario: string;
    estado: Estado;
    proveedor: Proveedor;
    detallesCompra: DetallesCompra[];
    pagos: Pago[];
    cuotas: any[];
}

export interface DetallesCompra {
    idCompra: number;
    idInsumo: string;
    cantidad: number;
    nombreInsumo: string;
}

export interface Estado {
    idEstadoCompra: number;
    descripcion: string;
}

export interface Pago {
    idPago: number;
    idCompra: number;
    idMedioPago: number;
    idEntidadPago: number;
    monto: number;
    medioPago: MedioPago;
    entidadesPago: EntidadesPago;
    fecha: string
}

export interface EntidadesPago {
    idEntidad: number;
    tipo: string;
    descripcion: string;
    emisor: string;
}

export interface MedioPago {
    idMedioPago: number;
    descripcion: string;
}

export interface Proveedor {
    apellido: string;
    nombre: string;
    nombreClave: string;
    idFiscal: string;
    idTipo: number;
    idCategoria: number;
    tipo: string;
    categoria: string;
    idEntidad: number;
}