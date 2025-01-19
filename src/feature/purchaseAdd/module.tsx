import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { IPurchaseAddStore } from "./store/usePurchaseAdd.store";
import { usePurchaseAddHook } from "./hooks/usePurchaseAdd.hook";
import { FormDataPurchaseComponent } from "./components/FormDataPurchase.component";
import { IMovementAddStore } from "../movementAdd/store/useMovementAdd.store";

interface IPurchaseAddModule {
    uiHook: IUiHook
    purchaseAddStore: IPurchaseAddStore
    movementAddStore: IMovementAddStore;
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}


export const PurchaseAddModule: FC<IPurchaseAddModule> = (props) => {



    const useModule = usePurchaseAddHook(props)

    return (
        <FormDataPurchaseComponent formData={useModule.purchaseDataState} availableSupplies={props.movementAddStore.supplyList}
            onChangePurchaseDateHandler={useModule.onChangePurchaseDateHandler} onAddSupplyItemHandler={useModule.onAddSupplyItemHandler}
            providerList={useModule.providerList} onSaveHandler={useModule.onSaveHandler} onChangeCheckboxHandler={useModule.onChangeCheckboxHandler} onAddInputFilesHanlder={useModule.onAddInputFilesHanlder} onRemoveFileHandler={useModule.onRemoveFileHandler}
        />
    )
}
