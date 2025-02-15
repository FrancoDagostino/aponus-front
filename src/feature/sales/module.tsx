import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { IMovementAddStore } from "../movementAdd/store/useMovementAdd.store";
import { useSalesAddHook } from "./hooks/useSalesAdd.hook";
import { FormDataSalesComponent } from "./components/FormDataSales.component";
import { ISalesAddStore } from "./store/useSalesAdd.store";


interface ISalesAddModule {
    uiHook: IUiHook
    salesAddStore: ISalesAddStore
    movementAddStore: IMovementAddStore;
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}


export const SalesAddModule: FC<ISalesAddModule> = (props) => {

    const useModule = useSalesAddHook(props)

    return (
        <FormDataSalesComponent billingList={props.salesAddStore.billingList} formData={useModule.purchaseDataState} availableSupplies={props.salesAddStore.productList} handleDeleteSupply={useModule.handleDeleteSupply}
            onChangePurchaseDateHandler={useModule.onChangePurchaseDateHandler} onAddSupplyItemHandler={useModule.onAddSupplyItemHandler}
            providerList={useModule.providerList} onSaveHandler={useModule.onSaveHandler} onChangeCheckboxHandler={useModule.onChangeCheckboxHandler} onAddInputFilesHanlder={useModule.onAddInputFilesHanlder} onRemoveFileHandler={useModule.onRemoveFileHandler}
            onClickQuotationHandler={useModule.onClickQuotationHandler} quatationList={props.salesAddStore.quatationList}
        />
    )
}
