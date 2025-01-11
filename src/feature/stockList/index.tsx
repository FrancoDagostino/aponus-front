import { Box, AppBar, Tabs, Tab } from "@mui/material";
import ModalNewStockComponent from "./components/ModalNewStock.component";
import StockListableComponent from "./components/StockListTable.component";
import StockProductListTableComponent from "./components/StockProductListTable.component";
import TabsCategoryComponentType from "./components/TabsCategoryType.component";
import { useStockModuleHook } from "./hooks/useStockModule.hook";
import { IStockStore } from "./store/useStock.store";
import { ICategoryStore } from "../categoryList/store/useCategory.store";
import ProductCategorySelectsComponent from "../productList/components/ProductCategorySelects.component";
import { UnAuthorizedModule } from "../unAuthorized/module";


interface IStockProps {
    stockStore: IStockStore;
    permissions: string[]
    rol: string
    categoryStore: ICategoryStore;
    onNavigate: (url: string) => void;
}

export const StockListModule: React.FC<IStockProps> = (props) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }

    const moduleStock = useStockModuleHook(props)


    return (
        <>
            <h1>Listado de Stock</h1>
            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        value={moduleStock.valueTabs}
                        onChange={moduleStock.handleChangeTabs}
                    >
                        <Tab
                            label="Stock Productos"
                            sx={{ fontFamily: "Rubik-Bold" }}
                        ></Tab>
                        <Tab
                            label="Stock Insumos"
                            sx={{ fontFamily: "Rubik-Bold" }}
                        ></Tab>
                    </Tabs>
                </AppBar>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    marginTop: "30px",
                    display: `${moduleStock.valueTabs === 0 ? "none" : "block"}`,
                }}
            >
                <TabsCategoryComponentType
                    categoryTypeList={props.stockStore.categoryTypeList}
                    onChangeTabsHandler={moduleStock.onChangeTabsHandler}
                />
                <StockListableComponent
                    data={props.stockStore.stockListForDescription}
                    onOpenEditModalHandler={moduleStock.onOpenEditModalHandler}
                />
                <h1>listado de insumos</h1>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    marginTop: "30px",
                    display: `${moduleStock.valueTabs === 1 ? "none" : "block"}`,
                }}
            >
                <ProductCategorySelectsComponent
                    categoryList={props.categoryStore.categoryList}
                    onSelectCategoryTypeHandler={moduleStock.onSelectCategoryTypeHandler}
                    descriptionList={props.categoryStore.descriptionList}
                    onSelectDescriptionTypeHandler={moduleStock.onSelectDescriptionTypeHandler}
                />
                {/* {props.stockStore.productList.map((product, index) => (
                    <div style={{ width: "100%", marginTop: "50px" }} key={index}>
                        <h3 style={{}}>{product.descripcionTipo}</h3>
                        {
                            product.descripcionProductos.map(p => (
                                <StockProductListTableComponent
                                    data={p.productos}
                                    onOpenEditModalHandler={moduleStock.onOpenEditModalHandler}
                                />
                            ))
                        }
                    </div>
                ))} */}

                {
                    props.stockStore.productList.map((product, index) => (
                        <div style={{ width: "100%", marginTop: "50px" }} key={index}>
                            <h3>{product.descripcionProducto}</h3>
                            <StockProductListTableComponent
                                data={product.productos}
                                onOpenEditModalHandler={moduleStock.onOpenEditModalHandler}
                            />
                        </div>
                    ))
                }            </Box>
            {/* <SnackBarConfirmed
            openSnackBar={openSnackBar}
            onCloseSnackBar={onCloseSnackBarHandler}
          /> */}
            <ModalNewStockComponent
                isOpen={moduleStock.isOpen}
                onCloseEditModalHandler={moduleStock.onCloseEditModalHandler}
                onEditStockHandler={moduleStock.onEditStockHandler}
            />
        </>
    );
}