import { IListadoComponentes, IPostUpdateStock, IStockProductList, IStockTypes } from "../model/stockList.model";
import { IRestClient, urlBase } from "../../../utils/clients/useRest.client";
import { createResponseUtil, TResponse } from '../../../utils/response.util';


interface IAuthenticationServiceProps {
  restClient: IRestClient
}

export interface IDbStockListService {
  getDbStockTypeListAll: () => Promise<TResponse<IStockTypes[], null>>;
  getDbStockListForDescription: (idDescription: string) => Promise<TResponse<IListadoComponentes[], null>>;
  postDbUpdateStock: (newStock: IPostUpdateStock) => Promise<TResponse<void, null>>;
  getDbStockProductList: (idTipo: string) => Promise<TResponse<IStockProductList[], null>>;
  getDbStockProductListForTypeAndDescription: (idTipo: string, idDescription: string) => Promise<TResponse<IStockProductList[], null>>;
}

export const useDbStockListService = (props: IAuthenticationServiceProps): IDbStockListService => {

  const getDbStockTypeListAll: IDbStockListService["getDbStockTypeListAll"] = async () => {

    const url = `${urlBase}/Categories/Supplies/Descriptions/List`
    const result = await props.restClient.get<IStockTypes[], null>(url, undefined)
    if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
    return createResponseUtil.error(result.data, result.status)

  }

  const getDbStockProductList: IDbStockListService["getDbStockProductList"] = async (idTipo: string) => {
    const url = `${urlBase}/Stocks/Products/List/${idTipo}`
    const result = await props.restClient.get<IStockProductList[], null>(url, undefined)
    if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
    return createResponseUtil.error(result.data, result.status)
  };
  const getDbStockProductListForTypeAndDescription: IDbStockListService["getDbStockProductListForTypeAndDescription"] = async (idTipo: string, idDescription: string) => {

    const url = `${urlBase}/Stocks/Products/List/${idTipo}/${idDescription}`
    const result = await props.restClient.get<IStockProductList[], null>(url, undefined)
    if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
    return createResponseUtil.error(result.data, result.status)
  };
  const getDbStockListForDescription: IDbStockListService["getDbStockListForDescription"] = async (idDescription: string) => {

    const url = `${urlBase}/Stocks/Supplies/List/${idDescription}`
    const result = await props.restClient.get<IListadoComponentes[], null>(url, undefined)
    if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
    return createResponseUtil.error(result.data, result.status)
  };

  const postDbUpdateStock: IDbStockListService["postDbUpdateStock"] = async (newStock: IPostUpdateStock) => {

    const url = `${urlBase}/Stocks/NewStockUpdate`
    const result = await props.restClient.post<void, null>(url, newStock, undefined)
    if (result.isSuccess) return createResponseUtil.success(result.data, result.status)
    return createResponseUtil.error(result.data, result.status)
  };

  return {
    getDbStockTypeListAll,
    getDbStockListForDescription,
    postDbUpdateStock,
    getDbStockProductList,
    getDbStockProductListForTypeAndDescription
  };
};
