import { IListadoComponentes, IStockFormateado } from "../model/product.model";


export const componentProductMapper = (
  listComponent: IListadoComponentes
): IStockFormateado[] => {
  const listComponentFormated: IStockFormateado[] =
    listComponent.componentes.flatMap((product) =>
      product.stockFormateado.map((componente) => {
        return {
          idInsumo: componente.idInsumo,
          requerido: componente.requerido,
          recibido: componente.recibido,
          pintura: componente.pintura,
          proceso: componente.proceso,
          total: componente.total,
          granallado: componente.granallado,
          moldeado: componente.moldeado,
          NombreInsumo: componente.NombreInsumo
        };
      })
    );

  return listComponentFormated;
};
