import { useEffect, useState } from "react";
import { IStockStore } from "../store/useStock.store";
import { IPostUpdateStock } from "../model/stockList.model";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";

interface IStockModuleProps {
  stockStore: IStockStore;
  categoryStore: ICategoryStore;
  onNavigate: (url: string) => void;
  uiHook: IUiHook
}

interface IStockModule {
  isOpen: boolean
  valueTabs: number
  newStock: IPostUpdateStock
  openSnackBar: boolean
  idDescriptionFounded: string
  idTypeProductFounded: string
  idDescriptionProductFounded: string
  handleChangeTabs: (_: React.SyntheticEvent, newValue: number) => void
  onChangeTabsHandler: (idDescription: string) => Promise<void>
  onSelectDescriptionTypeHandler: (idTipo: string, idDescription: string) => Promise<void>
  onSelectCategoryTypeHandler: (idType: string) => Promise<void>
  onOpenEditModalHandler: (newStock: IPostUpdateStock) => void
  onEditStockHandler: (valueNewStock: number) => Promise<void>
  onCloseSnackBarHandler: () => void
  onCloseEditModalHandler: () => void
}

export const useStockModuleHook = (props: IStockModuleProps): IStockModule => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [valueTabs, setValueTabs] = useState<number>(0);
  const [newStock, setNewStock] = useState<IPostUpdateStock>({
    destino: "",
    id: "",
    operador: "",
    valor: 0,
  });
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");
  const [idTypeProductFounded, setIdTypeProductFounded] = useState<string>("");
  const [idDescriptionProductFounded, setIdDescriptionProductFounded] = useState<string>("");

  useEffect(() => {
    onInitHandler();
  }, []);

  const onInitHandler = async () => {
    props.uiHook.showLoading()
    await props.stockStore.getStockTypeListAction();
    await props.categoryStore.getCategoryListAction();
    props.uiHook.hideLoading()
  };

  const handleChangeTabs = (_: React.SyntheticEvent, newValue: number) => {
    setValueTabs(newValue);
  };

  const onChangeTabsHandler = async (idDescription: string) => {
    props.uiHook.showLoading()
    setIdDescriptionFounded(idDescription);
    await props.stockStore.getDbStockListForDescriptionAction(idDescription);
    props.uiHook.hideLoading()
  };

  const onSelectDescriptionTypeHandler = async (idTipo: string, idDescription: string) => {
    props.uiHook.showLoading()
    await props.stockStore.getStockProductListForTypeAndDescriptionAction(
      idTipo,
      idDescription
    );
    setIdDescriptionProductFounded(idDescription);
    props.uiHook.hideLoading()
  };

  const onSelectCategoryTypeHandler = async (idType: string) => {
    props.uiHook.showLoading()
    await props.categoryStore.getDescriptionListAction(idType);
    await props.stockStore.getStockProductListAction(idType);
    setIdTypeProductFounded(idType);
    props.uiHook.hideLoading()
  };

  const onCloseEditModalHandler = () => {
    setIsOpen(false);
  };

  const onOpenEditModalHandler = (newStock: IPostUpdateStock) => {
    setNewStock(newStock);
    setIsOpen(true);
  };

  const onEditStockHandler = async (valueNewStock: number) => {
    const newStockUpdate: IPostUpdateStock = {
      ...newStock,
      valor: valueNewStock,
    };
    props.uiHook.showLoading()
    if (newStock.destino !== "Cantidad") {

      await props.stockStore.postDbUpdateStockAction(newStockUpdate);
      await props.stockStore.getDbStockListForDescriptionAction(
        idDescriptionFounded
      );

    }
    else {
      await props.stockStore.getStockProductListForTypeAndDescriptionAction(idTypeProductFounded, idDescriptionFounded);
      await props.stockStore.updateStockProductAction(valueNewStock, newStock.id)
    }
    props.uiHook.hideLoading()

    onCloseEditModalHandler();
    setOpenSnackBar(true);
  };

  const onCloseSnackBarHandler = () => {
    setOpenSnackBar(false);
  };

  return {
    isOpen,
    newStock,
    valueTabs,
    openSnackBar,
    idDescriptionFounded,
    idDescriptionProductFounded,
    idTypeProductFounded,
    handleChangeTabs,
    onChangeTabsHandler,
    onCloseSnackBarHandler,
    onEditStockHandler,
    onOpenEditModalHandler,
    onSelectCategoryTypeHandler,
    onSelectDescriptionTypeHandler,
    onCloseEditModalHandler
  }


}