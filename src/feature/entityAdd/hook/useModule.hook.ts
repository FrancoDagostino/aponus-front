import { useEffect, useState } from "react"
import { IEntityAddStore } from "../store/useEntityAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";


export interface IFormData {
    nombreClave: string;
    nombre: string;
    apellido: string;
    pais: string;
    ciudad: string;
    provincia: string;
    localidad: string;
    calle: string;
    altura: string;
    codigoPostal: string;
    barrio: string;
    telefono1: string;
    telefono2: string;
    telefono3: string;
    email: string;
    idFiscal: string;
}

interface IEntityAddHookProps {
    entityAddStore: IEntityAddStore;
    uiHook: IUiHook
    entityId: string
    onNavigate: (url: string) => void;
}

interface IEntityAddHook {
    formData: IFormData
    onChangeFormDataHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onSaveHandler: () => void
}

export const useEntityAddHook = (props: IEntityAddHookProps): IEntityAddHook => {




    useEffect(() => {
        if (props.entityId !== "0") {
            onPreload()
        }
    }, [])


    const onPreload = async () => {
        props.uiHook.showLoading()
        props.entityAddStore.getNewEntityAction(props.entityId)
        props.uiHook.hideLoading()
    }


    const [formData, setFormData] = useState<IFormData>({
        altura: "",
        apellido: "",
        barrio: "",
        calle: "",
        ciudad: "",
        codigoPostal: "",
        email: "",
        idFiscal: "",
        localidad: "",
        nombre: "",
        nombreClave: "",
        pais: "",
        provincia: "",
        telefono1: "",
        telefono2: "",
        telefono3: ""
    })

    const onChangeFormDataHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSaveHandler = () => {
        props.uiHook.showLoading()
        props.entityAddStore.addNewEntityAction(formData)
        props.uiHook.hideLoading()
    }

    return {
        formData,
        onChangeFormDataHandler,
        onSaveHandler
    }
}