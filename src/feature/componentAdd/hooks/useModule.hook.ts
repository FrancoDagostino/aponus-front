import { useEffect, useState } from "react";
import { IStockStore } from "../../stockList/store/useStock.store";
import { IComponentAddStore } from "../store/useComponentAdd.store";
import { IComponentAdd } from "../model/componentAdd.model";
import { IUiHook } from "../../ui/hooks/useUi.hook";

interface IComponentAddModuleProps {
    componentAddStore: IComponentAddStore
    stockStore: IStockStore;
    uiHook: IUiHook
    idInsumo: string
    onNavigate: (url: string) => void

}

interface IComponentAddHook {
    componentForm: IComponentAdd
    description: string
    onAddOrUpdateComponentHandler: () => void
    onChangeComponentFormHandler: (value: string, nameProperty: string) => void
    isEdit: boolean
}

export const useComponentAddHook = (props: IComponentAddModuleProps): IComponentAddHook => {
    const [componentForm, setComponentForm] = useState<IComponentAdd>({
        Altura: '',
        Diametro: '',
        DiametroNominal: '',
        Espesor: '',
        Longitud: '',
        Perfil: '',
        Peso: '',
        Tolerancia: '',
        idAlmacenamiento: "Kg",
        idFraccionamiento: "",
        idDescripcion: 1,
        idComponente: ''
    })
    const [description, setDescription] = useState<string>("BRIDA");
    const [isEdit, setIsEdit] = useState<boolean>(false)

    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = async () => {
        props.uiHook.showLoading()
        await props.stockStore.getStockTypeListAction();
        props.uiHook.hideLoading()

        if (props.idInsumo !== "") {
            onPreload()
        }
    }


    const onPreload = async () => {
        props.uiHook.showLoading()
        const arrayIdInsumo = props.idInsumo.split('*')
        const result = await props.componentAddStore.getComponentAction(arrayIdInsumo[0], arrayIdInsumo[1])

        if (result.isError) return

        setComponentForm({
            Altura: result.data.altura === null ? '' : result.data.altura,
            Diametro: result.data.diametro === null ? '' : result.data.diametro,
            DiametroNominal: result.data.diametroNominal === null ? 0 : result.data.diametroNominal,
            Espesor: result.data.espesor === null ? '' : result.data.espesor,
            idAlmacenamiento: result.data.idAlmacenamiento === null ? 'UD' : result.data.idAlmacenamiento,
            idDescripcion: result.data.idDescripcion,
            idFraccionamiento: result.data.idFraccionamiento === null ? 'Nin' : result.data.idFraccionamiento,
            Longitud: result.data.longitud === null ? '' : result.data.longitud,
            Perfil: result.data.perfil === null ? '' : result.data.perfil,
            Peso: result.data.peso === null ? '' : result.data.peso,
            Tolerancia: result.data.tolerancia === null ? '' : result.data.tolerancia,
            idComponente: result.data.idInsumo

        })
        setIsEdit(true)

        props.uiHook.hideLoading()


    }
    const onChangeComponentFormHandler = (value: string, nameProperty: string) => {

        if (nameProperty === 'idDescripcion') {
            const textDescription = props.stockStore.categoryTypeList.find(type => type.idDescripcion === Number(value))!.nombreDescripcion
            setDescription(textDescription);
        }
        setComponentForm({
            ...componentForm,
            [nameProperty]: value
        })
    }

    const onAddOrUpdateComponentHandler = async () => {
        const textDescription = props.stockStore.categoryTypeList.find(type => type.idDescripcion === Number(componentForm.idDescripcion))!.nombreDescripcion
        const result = await props.componentAddStore.postCreateComponentAction(componentForm, textDescription);
        if (result.isSuccess) {
            props.uiHook.onSetSnackbar("Componente agregado o modificado correctamente", true)
            props.onNavigate('/component-list')
        }
    }




    return {
        componentForm,
        description,
        isEdit,
        onChangeComponentFormHandler,
        onAddOrUpdateComponentHandler
    }
}
