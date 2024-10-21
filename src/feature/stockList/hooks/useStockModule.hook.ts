import { useEffect, useState } from "react";
import { IStockStore } from "../store/useStock.store";
import { IPostUpdateStock } from "../model/stockList.model";
import { ICategoryStore } from "../../categoryList/store/useCategory.store";

interface IStockModuleProps {
  stockStore: IStockStore;
  // productListHook: IProductListHook;
  categoryStore: ICategoryStore;
  onNavigate: (url: string) => void;
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

  const onInitHandler = () => {
    props.stockStore.getStockTypeListAction();
    props.categoryStore.getCategoryListAction();
  };
  useEffect(() => {
    onInitHandler();
  }, []);

  const handleChangeTabs = (_: React.SyntheticEvent, newValue: number) => {
    setValueTabs(newValue);
  };

  const onChangeTabsHandler = async (idDescription: string) => {
    setIdDescriptionFounded(idDescription);
    await props.stockStore.getDbStockListForDescriptionAction(idDescription);
  };

  const onSelectDescriptionTypeHandler = async (idTipo: string, idDescription: string) => {
    await props.stockStore.getStockProductListForTypeAndDescriptionAction(
      idTipo,
      idDescription
    );
    setIdDescriptionProductFounded(idDescription);
  };

  const onSelectCategoryTypeHandler = async (idType: string) => {
    await props.categoryStore.getDescriptionListAction(idType);
    await props.stockStore.getStockProductListAction(idType);
    setIdTypeProductFounded(idType);
  };

  const onCloseEditModalHandler = () => {
    setIsOpen(false);
  };

  const onOpenEditModalHandler = (newStock: IPostUpdateStock) => {
    setNewStock(newStock);
    setIsOpen(true);
  };

  const onEditStockHandler = async (valueNewStock: number) => {
    console.log(newStock)
    const newStockUpdate: IPostUpdateStock = {
      ...newStock,
      valor: valueNewStock,
    };
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