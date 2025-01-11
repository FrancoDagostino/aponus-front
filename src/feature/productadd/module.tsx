import { FC } from "react";

import { IProductAddStore } from "./store/productAdd.store";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { useProductAddModule } from "./hooks/useModule.hook";
import { ProductAddForm } from "./components/ProductAdd.component";
import { UnAuthorizedModule } from "../unAuthorized/module";

interface IProductAddModule {
    productAddStore: IProductAddStore;
    uiHook: IUiHook
    productId: string
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const ProductAddModule: FC<IProductAddModule> = (props) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }

    const useModule = useProductAddModule(props)

    return (
        <ProductAddForm componentId={useModule.idComponent} componentQuantity={useModule.componentQuantity}
            components={useModule.components} handleAddComponent={useModule.handleAddComponent} handleRemoveComponent={useModule.handleRemoveComponent} handleSetIdComponent={useModule.handleSetIdComponent} handleSetQuantity={useModule.handleSetQuantity}
            onSaveHandler={useModule.onSaveHandler} onChangeProductDescription={useModule.onChangeProductDescription} formData={useModule.formData} handleInputChange={useModule.handleInputChange} componentCategory={useModule.componentCategory} onChangeComponentCategory={useModule.onChangeComponentCategory} onChangeTypeProduct={useModule.onChangeTypeProduct} productDescription={props.productAddStore.productDescription} productTypeList={props.productAddStore.productTypeList} suppliesListComputed={useModule.suppliesListComputed} supplieStorageList={props.productAddStore.storageSupplie} />
    )
}