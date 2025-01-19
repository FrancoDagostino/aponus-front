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
    idEntidad: null | number
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

    const [formData, setFormData] = useState<IFormData>({
        idEntidad: null,
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


    useEffect(() => {
        if (props.entityId !== "0") {
            onPreload()
        }
    }, [])


    const onPreload = async () => {
        props.uiHook.showLoading()
        const result = await props.entityAddStore.getNewEntityAction(props.entityId)
        props.uiHook.hideLoading()
        if (result.isError) return

        const foundEntity = result.data.find(entity => entity.idEntidad === Number(props.entityId))
        if (foundEntity === undefined) return

        setFormData({
            idEntidad: Number(props.entityId),
            altura: foundEntity.altura,
            apellido: foundEntity.apellido,
            barrio: foundEntity.barrio,
            calle: foundEntity.calle,
            ciudad: foundEntity.ciudad,
            codigoPostal: foundEntity.codigoPostal,
            email: foundEntity.email,
            idFiscal: foundEntity.idFiscal,
            localidad: foundEntity.localidad,
            nombre: foundEntity.nombre,
            nombreClave: foundEntity.nombreClave,
            pais: foundEntity.pais,
            provincia: foundEntity.provincia,
            telefono1: foundEntity.telefono1,
            telefono2: foundEntity.telefono2,
            telefono3: foundEntity.telefono3
        })
    }




    const onChangeFormDataHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSaveHandler = async () => {
        props.uiHook.showLoading()
        if (props.entityId !== "0") {
            const result = await props.entityAddStore.editEntityAction(formData, Number(props.entityId))
            props.uiHook.hideLoading()
            if (result.isError)
                props.uiHook.onSetSnackbar("Entidad creada correctamente", true)
            props.onNavigate('/entity-list')


        } else {
            props.uiHook.showLoading()
            const result = await props.entityAddStore.addNewEntityAction(formData)
            props.uiHook.hideLoading()
            result
        }


    }

    return {
        formData,
        onChangeFormDataHandler,
        onSaveHandler
    }
}