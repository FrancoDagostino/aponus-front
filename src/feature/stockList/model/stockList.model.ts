export interface IStockTypes {
  idDescripcion: number;
  nombreDescripcion: string;
}

export interface IListadoComponentes {
  idDescripcion: number;
  descripcion: string;
  especificacionesFormato: IEspecificaciones[];
  columnas: string[];
}

export interface IEspecificaciones {
  idDescripcion: string;
  IdComponente: string;
  recibido: string;
  pintura: string;
  proceso: string;
  granallado: string;
  moldeado: string;
  pendiente: string
  NombreInsumo: string
}

export interface IPostUpdateStock {
  id: string;
  operador: string;
  valor: number;
  destino: string;
}


export interface IStockProductList {
  idTipo: string;
  descripcionTipo: string;
  descripcionProductos: DescripcionProducto[];
}

export interface DescripcionProducto {
  idDescripcion: number;
  NombreDescripcion: string;
  productos: IProducto[];
  columnas: string[];
}

export interface IProducto {
  idProducto: string;
  idTipo: string;
  diametroNominal: string;
  tolerancia: string;
  cantidad: string;
  precioLista: string;
  precioFinal: string;
  porcentajeGanancia: string;
}
