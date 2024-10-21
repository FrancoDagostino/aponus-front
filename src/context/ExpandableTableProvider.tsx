import { FC, ReactNode, createContext, useContext, useState } from "react";
import { ICategoryStore } from "../feature/categoryList/store/useCategory.store";
import { IProductListStore } from "../feature/productList/store/useProductList.store";
import { IStockFormateado } from "../feature/productList/model/product.model";
import { IListadoDescripciones } from "../feature/categoryList/model/category.model";


interface ExpandableTableContextProps {
  componentList: IStockFormateado[];
  handleSelectProductId: (idProduct: string, quantity: number) => void;
  handleSelectListDescription: (idType: string) => Promise<IListadoDescripciones[]>;
  handlAddOrUpdateDescription: (description: string, idType: string) => void;
  handleUpdateDescription: (idDescription: number, description: string) => void;
}

const ExpandableTableContext = createContext<ExpandableTableContextProps>({
  componentList: [],
  handleSelectProductId: () => { },
  handleSelectListDescription: () => { return new Promise<IListadoDescripciones[]>((resolve) => { resolve([]); }); },
  handlAddOrUpdateDescription: () => { },
  handleUpdateDescription: () => { },
});

interface ExpandableTableProviderProps {
  children: ReactNode;
  categoryStore: ICategoryStore;
  productListStore: IProductListStore;

}

export const ExpandableTableProvider: FC<ExpandableTableProviderProps> = (
  props
) => {
  const [componentList, setComponentList] = useState<IStockFormateado[]>([]);

  const handleSelectProductId = async (idProduct: string, quantity: number) => {
    const response = await props.productListStore.postProductComponentAction(idProduct, quantity);
    if (response.isError) return null
    console.log(response.data)
    setComponentList(response.data);
  };

  const handleSelectListDescription = async (idType: string) => {
    const result = await props.categoryStore.getDescriptionListAction(idType);
    if (result.isError) return []
    return result.data
  };

  const handlAddOrUpdateDescription = async (
    description: string,
    idType: string
  ) => {
    props.categoryStore.addDescriptionAction(description, idType);
  };

  const handleUpdateDescription = async (idDescription: number, description: string) => {

    await props.categoryStore.updateDescriptionAction(idDescription, description);
  }
  return (
    <ExpandableTableContext.Provider
      value={{
        componentList,
        handleSelectProductId,
        handleSelectListDescription,
        handlAddOrUpdateDescription,
        handleUpdateDescription
      }}
    >
      {props.children}
    </ExpandableTableContext.Provider>
  );
};

export const useExpandableTableContext = () => {
  const context = useContext(ExpandableTableContext);
  if (!context) {
    throw new Error(
      "useProductoContext must be used within a ProductoProvider"
    );
  }
  return context;
};
