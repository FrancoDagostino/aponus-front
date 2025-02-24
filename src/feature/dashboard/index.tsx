import { IUiHook } from "../ui/hooks/useUi.hook"
import { IDashboardStore } from "./store/useDashboard.store"
import { FC } from "react"
import { useDashboardHook } from "./hooks/useDashboard.hook"
import { PendingSalesTableComponent } from "./components/PendingSalesTable.componen"
import { ProductsTableComponent } from "./components/ProductsTable.component"
import TabsCategoryComponentType from "../stockList/components/TabsCategoryType.component"
import { ComponentListTable } from "../componentList/components/ComponentListTable.component"
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BarChart from "./components/BarChart.component"
interface IDashboardModuleProps {
    dashboardStore: IDashboardStore
    uiHook: IUiHook
    onNavigate: (path: string) => void
}




export const DashboardModule: FC<IDashboardModuleProps> = (props) => {
    const useModule = useDashboardHook({
        dashboardStore: props.dashboardStore,
        uiHook: props.uiHook
    })
    useModule
    return (
        <div style={{ marginBottom: '20px' }}>
            <BarChart data={props.dashboardStore.barChart} />

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Ventas Pendientes</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <PendingSalesTableComponent searchValue={""} pendingSales={props.dashboardStore.pendingSales} />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Productos Faltantes</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <ProductsTableComponent searchValue={""} products={props.dashboardStore.products} />
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h2>Categorías y Lista de Componentes</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <TabsCategoryComponentType categoryTypeList={props.dashboardStore.descriptions} onChangeTabsHandler={useModule.onChangeTabsHandler} />
                    <ComponentListTable data={props.dashboardStore.supplieList} onEdit={() => { }} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}


