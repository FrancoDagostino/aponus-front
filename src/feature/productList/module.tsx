import ProductCategorySelectsComponent from "./components/ProductCategorySelects.component";
import ProductListTableComponent from "./components/ProductListTable.component";
import { IProductListStore } from "./store/useProductList.store";
import { ICategoryStore } from "../categoryList/store/useCategory.store";
import { useModuleProductListHook } from './hooks/useModule.hook';

interface IProductListProps {
    productListStore: IProductListStore;
    categoryStore: ICategoryStore;
    onNavigate: (url: string) => void;
}

export const ProductListModule: React.FC<IProductListProps> = (props) => {

    const moduleHook = useModuleProductListHook(props)

    console.log(props.productListStore.productList)

    return (
        <>
            <h1>Título de la Sección</h1>
            <ProductCategorySelectsComponent
                categoryList={props.categoryStore.categoryList}
                onSelectCategoryTypeHandler={moduleHook.onSelectCategoryTypeHandler}
                descriptionList={props.categoryStore.descriptionList}
                onSelectDescriptionTypeHandler={moduleHook.onSelectDescriptionTypeHandler}
            />
            {props.productListStore.productList.map((product, index) => {
                product.descripcionProductos.map(descProduc => (
                    <div style={{ width: "100%", marginTop: "50px" }} key={index}>
                        <h3 style={{}}>{descProduc.descripcionProducto}</h3>
                        <ProductListTableComponent data={descProduc.productos} />
                    </div>
                ))

            })}
        </>
    );
};


