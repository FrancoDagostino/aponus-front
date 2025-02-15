import { FC } from "react"
import { SalesDataGridComponent } from "./components/SalesListDataGrid.component"
import { ISalesListStore } from "./store/useSalesList.store"
import { IUiHook } from "../ui/hooks/useUi.hook"
import { useSalesLIstHook } from "./hooks/useSales.hook"
import { SalesViewModalComponent } from "./components/SalesViewModal.component"
import { Box, Button } from "@mui/material"
import { AddCircleOutlined } from "@mui/icons-material"

interface ISalesListModuleProps {
    salesListStore: ISalesListStore
    uiHook: IUiHook
    onNavigate: (url: string) => void
}


export const SalesListModule: FC<ISalesListModuleProps> = (props) => {
    const salesListHook = useSalesLIstHook(props)
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Ventas</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => props.onNavigate('/sales-add')}
                    startIcon={<AddCircleOutlined />}
                >
                    Nueva Venta
                </Button>
            </Box>
            <SalesDataGridComponent salesList={props.salesListStore.salesList} searchValue={""} onViewSale={salesListHook.onViewSale} onRemoveSale={() => { }} />
            <SalesViewModalComponent isOpen={salesListHook.isOpenViewSales} handleClose={salesListHook.onCloseViewSales} sales={salesListHook.salesList} />
        </>

    )
}
