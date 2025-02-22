import { FC } from "react";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { IPurchaseListStore } from "./store/usePurcharseList.store";
import { usePurchaseListHook } from "./hooks/usePucharseList.hook";
import { PurchaseDataGridComponent } from "./components/PucharseDataGrid.component";
import { PurchaseViewModalComponent } from "./components/PurchaseView.component";
import { Box, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


interface IPucharseListModule {
    uiHook: IUiHook
    purchaseListStore: IPurchaseListStore
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}


export const PurchaseListModule: FC<IPucharseListModule> = (props) => {


    const useModule = usePurchaseListHook(props)

    return (
        <>
            <pre>
            </pre>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Compras</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => props.onNavigate('/pucharse-add')}
                    startIcon={<AddCircleOutlinedIcon />}
                >
                    Nueva Compra
                </Button>
            </Box>
            <PurchaseDataGridComponent onRemovePucharse={useModule.onRemovePurchase} onViewPucharse={useModule.onViewPurchase} purchaseList={props.purchaseListStore.purchaseListState} searchValue="" />
            <PurchaseViewModalComponent onSaveFileHandler={useModule.onSaveFile} onDeleteFileHandler={useModule.onRemoveFile} isOpen={useModule.isOpenViewPucharse} handleClose={useModule.onCloseViewPucharse} purchase={useModule.purchaseState} />
        </>

    )
}