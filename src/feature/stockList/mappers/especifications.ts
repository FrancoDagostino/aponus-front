import {
  IEspecificaciones,
  IListadoComponentes,
} from "../model/stockList.model";

export function getSpecificationsStockMapper(
  listado: IListadoComponentes[]
): IEspecificaciones[] {
  return listado.length < 0 ? [] : listado.flatMap((componente) => componente.especificacionesFormato);
}
