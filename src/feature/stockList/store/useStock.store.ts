import { useState } from "react";
import { IEspecificaciones, IPostUpdateStock, IStockProductList, IStockTypes } from "../model/stockList.model";
import { IDbStockListService } from "../services/useDbStockList.service";
import { getSpecificationsStockMapper } from '../mappers/especifications';
import { createResultUtil, TResult } from '../../../utils/result.util';

export interface IStockStore {
  categoryTypeList: IStockTypes[];
  stockListForDescription: IEspecificaciones[];
  productList: IStockProductList[];
  getStockTypeListAction: () => Promise<TResult<null, null>>;
  getDbStockListForDescriptionAction: (idDescription: string) => Promise<TResult<null, null>>;
  postDbUpdateStockAction: (newStock: IPostUpdateStock) => Promise<TResult<null, null>>;
  getStockProductListAction: (idTipo: string) => Promise<TResult<null, null>>;
  getStockProductListForTypeAndDescriptionAction: (idTipo: string, idDescription: string) => Promise<TResult<null, null>>;
}

interface IStockStoreProps {
  useDbStockListService: IDbStockListService;
}

const useStockStore = (props: IStockStoreProps): IStockStore => {
  const [categoryTypeList, setCategoryTypeList] = useState<IStockTypes[]>([]);
  const [stockListForDescription, setStockListForDescription] = useState<IEspecificaciones[]>([]);
  const [productList, setProductList] = useState<IStockProductList[]>([]);

  const getStockTypeListAction: IStockStore["getStockTypeListAction"] = async () => {
    const result = await props.useDbStockListService.getDbStockTypeListAll()
    if (result.isError) return createResultUtil.error(null)
    setCategoryTypeList(result.data)
    return createResultUtil.success(null)
  };

  const getDbStockListForDescriptionAction: IStockStore["getDbStockListForDescriptionAction"] = async (idDescription: string) => {

    const result = await props.useDbStockListService.getDbStockListForDescription(idDescription)
    if (result.isError) return createResultUtil.error(null)
    setStockListForDescription(getSpecificationsStockMapper(result.data))
    return createResultUtil.success(null)
  };

  const postDbUpdateStockAction: IStockStore["postDbUpdateStockAction"] = async (newStock: IPostUpdateStock) => {

    const result = await props.useDbStockListService.postDbUpdateStock(newStock);
    if (result.isError) return createResultUtil.error(null)
    return createResultUtil.success(null)

  };
  const getStockProductListAction: IStockStore["getStockProductListAction"] = async (idTipo: string) => {
    const result = await props.useDbStockListService.getDbStockProductList(idTipo);

    if (result.isError) return createResultUtil.error(null)
    setProductList(result.data);
    return createResultUtil.success(null)
  };

  const getStockProductListForTypeAndDescriptionAction: IStockStore["getStockProductListForTypeAndDescriptionAction"] =
    async (idTipo: string, idDescription: string) => {
      const result = await props.useDbStockListService.getDbStockProductListForTypeAndDescription(idTipo, idDescription);

      if (result.isError) return createResultUtil.error(null)
      setProductList(result.data);
      return createResultUtil.success(null)

    };

  return {
    categoryTypeList,
    stockListForDescription,
    productList,
    getStockTypeListAction,
    getDbStockListForDescriptionAction,
    postDbUpdateStockAction,
    getStockProductListAction,
    getStockProductListForTypeAndDescriptionAction
  };
};

export default useStockStore;
