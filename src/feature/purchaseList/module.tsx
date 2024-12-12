import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { IPurchaseListStore } from "./store/usePurcharseList.store";
import { usePurchaseListHook } from "./hooks/usePucharseList.hook";
import { PurchaseDataGridComponent } from "./components/PucharseDataGrid.component";
import { PurchaseViewModalComponent } from "./components/PurchaseView.component";


interface IPucharseListModule {
    uiHook: IUiHook
    purchaseListStore: IPurchaseListStore
    onNavigate: (url: string) => void;
}


export const PurchaseListModule: FC<IPucharseListModule> = (props) => {

    const useModule = usePurchaseListHook(props)
    return (
        <>
            <h2>Listado de Compras</h2>
            <PurchaseDataGridComponent onRemovePucharse={useModule.onRemovePurchase} onViewPucharse={useModule.onViewPurchase} purchaseList={props.purchaseListStore.purchaseListState} searchValue="" />
            <PurchaseViewModalComponent isOpen={false} handleClose={() => { }} purchase={useModule.purchaseState} />
        </>

    )
}