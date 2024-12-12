import { useEffect, useState } from "react";
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { IProductAddStore } from "../store/productAdd.store";
import { Component } from "../components/ProductAdd.component";

interface IProduct {
    idTipo: string
    idDescripcion: string
    diametroNominal: string
    tolerancia: string
}

interface IComponent {
    idComponente: string
    cantidad: number // si es cm lo mando vacio
    largo: number // si es ud lo mando vacio
    idProducto: string
}

export interface IProductPost {
    idTipo: string
    idDescripcion: string
    diametroNominal: string
    tolerancia: string
    componentes: Array<IComponent>
}

interface IProductAddHookProps {
    productAddStore: IProductAddStore;
    uiHook: IUiHook
    onNavigate: (url: string) => void;
    productId: string
}


export const useProductAddModule = (props: IProductAddHookProps) => {
    const [formData, setFormData] = useState<IProduct>({
        diametroNominal: '',
        tolerancia: '',
        idTipo: '',
        idDescripcion: ''
    });
    const [componentCategory, setComponentCategory] = useState<{ idComponent: string, description: string, idAlmacenamiento: string }>({
        description: 'BRIDA',
        idComponent: "A",
        idAlmacenamiento: 'UD'
    });

    const [components, setComponents] = useState<Component[]>([]);

    const [idComponent, setIdComponent] = useState('');

    const [componentQuantity, setComponentQuantity] = useState<string>('');


    useEffect(() => {
        onInit()
    }, [])

    const onInit = async () => {
        props.uiHook.showLoading()
        await props.productAddStore.getStorageSuppliesAction()
        await props.productAddStore.getSuppliesAction()
        await props.productAddStore.getProductTypeListAction()
        props.uiHook.hideLoading()

        if (props.productId !== "0") {
            // TODO LLAMAR ENDPOINT PARA PRECARGAR PRODUCTO

            onPreload()
        }


    }

    const onPreload = async () => {

        props.uiHook.showLoading()
        const result = await props.productAddStore.getProduct(props.productId)

        if (result.isError) return

        await props.productAddStore.getProductDescriptionListAction(result.data.product.idProducto)

        setFormData({
            diametroNominal: result.data.product.diametroNominal.toString(),
            idDescripcion: result.data.product.idDescripcion.toString(),
            idTipo: result.data.product.idTipo.toString(),
            tolerancia: result.data.product.tolerancia
        })

        const components: Component[] = result.data.component.componentes.map(component => (
            {
                category: component.descripcion,
                id: component.idComponente,
                type: component.stockFormateado[0].requerido.split(" ")[1],
                quantity: component.stockFormateado[0].requerido
            }
        ))

        setComponents(components)
        props.uiHook.hideLoading()
    }

    const onChangeTypeProduct = async (idType: string) => {
        props.uiHook.showLoading()
        await props.productAddStore.getProductDescriptionListAction(idType)
        setFormData({
            ...formData,
            idTipo: idType
        })
        props.uiHook.hideLoading()
    }

    const onChangeComponentCategory = (productCategory: string) => {
        const arrayProduct = productCategory.split(',')
        console.log(arrayProduct)
        setComponentCategory({
            description: arrayProduct[1],
            idComponent: arrayProduct[0],
            idAlmacenamiento: arrayProduct[2]
        })
    }

    const onChangeProductDescription = (idDescription: string) => {
        setFormData({
            ...formData,
            idDescripcion: idDescription
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const suppliesListComputed = props.productAddStore.supplieList.filter(p => p.nombre.toLowerCase().trim().includes(componentCategory.description.toLowerCase().trim()))

    const onSaveHandler = async () => {
        console.log(components)

        const product: IProductPost = {
            diametroNominal: formData.diametroNominal,
            idDescripcion: formData.idDescripcion,
            idTipo: formData.idTipo,
            tolerancia: formData.tolerancia,
            componentes: components.map(component => (
                {
                    cantidad: component.type.trim() !== 'CM' ? Number(component.quantity.toString().replace(',', '.')) : 0,
                    largo: component.type.trim() !== 'UD' ? Number(component.quantity.toString().replace(',', '.')) : 0,
                    idComponente: component.id.toString(),
                    idProducto: ''
                }
            ))
        }

        props.uiHook.showLoading()
        await props.productAddStore.saveProduct(product)
        props.uiHook.hideLoading()
    }

    const handleAddComponent = () => {
        const componentDescription = suppliesListComputed.find(supplie => supplie.idInsumo === idComponent)?.nombre!
        if (idComponent && componentQuantity !== '') {
            const newComponent: Component = {
                id: idComponent,
                category: componentDescription,
                quantity: componentQuantity,
                type: componentCategory.idAlmacenamiento
            };
            setComponents([...components, newComponent]);
            setIdComponent('');
            setComponentQuantity('');
        }
    };

    const handleRemoveComponent = (id: string) => {
        setComponents(components.filter(component => component.id !== id));
    };

    const handleSetIdComponent = (idComponent: string) => {
        setIdComponent(idComponent)
    }

    const handleSetQuantity = (quantity: string) => {
        setComponentQuantity(quantity)
    }

    return {
        suppliesListComputed,
        componentCategory,
        formData,
        idComponent,
        componentQuantity,
        components,
        onChangeTypeProduct,
        onChangeComponentCategory,
        handleInputChange,
        onChangeProductDescription,
        onSaveHandler,
        handleAddComponent,
        handleSetQuantity,
        handleSetIdComponent,
        handleRemoveComponent
    }
}