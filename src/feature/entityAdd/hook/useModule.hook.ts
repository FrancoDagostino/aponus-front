import { useState } from "react"


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

// interface IEntityAddHookProps {

// }

interface IEntityAddHook {
    formData: IFormData
    onChangeFormDataHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const useEntityAddHook = (): IEntityAddHook => {

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

    return {
        formData,
        onChangeFormDataHandler
    }
}