import ProductCategorySelectsComponent from "./components/ProductCategorySelects.component";
import ProductListTableComponent from "./components/ProductListTable.component";
import { IProductListStore } from "./store/useProductList.store";
import { ICategoryStore } from "../categoryList/store/useCategory.store";
import { useModuleProductListHook } from './hooks/useModule.hook';
import { Box, Button } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { UnAuthorizedModule } from "../unAuthorized/module";

interface IProductListProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
}

export const ProductListModule: React.FC<IProductListProps> = (props) => {

    if (!props.permissions.includes(props.rol)) {
        return <UnAuthorizedModule />
    }

    const moduleHook = useModuleProductListHook(props)

    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Productos</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => props.onNavigate('/product-add')}
                    startIcon={<AddCircleOutlinedIcon />}
                >
                    Nuevo Producto
                </Button>
            </Box>
            <ProductCategorySelectsComponent
                categoryList={props.categoryStore.categoryList}
                onSelectCategoryTypeHandler={moduleHook.onSelectCategoryTypeHandler}
                descriptionList={props.categoryStore.descriptionList}
                onSelectDescriptionTypeHandler={moduleHook.onSelectDescriptionTypeHandler}
            />
            {
                props.productListStore.productList.map((product, index) => (
                    <div style={{ width: "100%", marginTop: "50px" }} key={index}>
                        <h3>{product.descripcionProducto}</h3>
                        <ProductListTableComponent data={product.productos} />
                    </div>
                ))
            }
        </>
    );
};


