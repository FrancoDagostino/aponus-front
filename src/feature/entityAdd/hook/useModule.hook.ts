import { useEffect, useState } from "react"
import { IEntityAddStore } from "../store/useEntityAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { ICountries } from "../../entityList/model/EntityList.model";


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
    geoIds: IGeoNames
    onChangeFormDataHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onSaveHandler: () => void
    onChangeCountrie: (idGeoname: number, geoName: string) => void
    onChangeProvince: (idGeoname: number, geoName: string, countryCode: string, adminCode: string) => void
    onChangeCity: (idGeoname: number, geoName: string) => void
}

export interface IGeoNames {
    geoIdCountry: number,
    geoIdProvince: number,
    geoIdCity: number
}

export const useEntityAddHook = (props: IEntityAddHookProps): IEntityAddHook => {
    const [geoIds, setGeoIds] = useState<IGeoNames>({
        geoIdCountry: 0,
        geoIdProvince: 0,
        geoIdCity: 0,
    })
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
        onInit()

    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        const resultCountry = await props.entityAddStore.getPaisList()
        props.uiHook.hideLoading()

        if (resultCountry.isError) return
        if (props.entityId !== "0") {
            props.uiHook.showLoading()
            onPreload(resultCountry.data)
            props.uiHook.hideLoading()
        }
    }
    const onPreload = async (countrys: ICountries) => {
        props.uiHook.showLoading()
        const result = await props.entityAddStore.getNewEntityAction(props.entityId)
        props.uiHook.hideLoading()
        if (result.isError) return

        const foundEntity = result.data.find(entity => entity.idEntidad === Number(props.entityId))
        if (foundEntity === undefined) return

        const selectedCountry = countrys.geonames.find(
            (c) => c.countryName.toUpperCase() === foundEntity.pais
        )!;
        props.uiHook.showLoading()
        const resultProvince = await props.entityAddStore.getProvinceListAction(selectedCountry.geonameId.toString())
        props.uiHook.hideLoading()
        if (resultProvince.isError) return

        const selectedProvince = resultProvince.data.find(province => province.toponymName.toUpperCase() === foundEntity.provincia)!

        props.uiHook.showLoading()
        const resultCity = await props.entityAddStore.getCityListAction(selectedProvince.countryCode, selectedProvince.adminCode1)
        props.uiHook.hideLoading()
        if (resultCity.isError) return

        const selectedCity = resultCity.data.geonames.find(city => city.toponymName.toUpperCase() === foundEntity.ciudad)!

        setGeoIds({
            geoIdCountry: selectedCountry.geonameId,
            geoIdCity: Number(selectedCity.geonameId),
            geoIdProvince: Number(selectedProvince.geonameId)
        })
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

    const onChangeCountrie = async (idGeoname: number, geoName: string) => {
        setFormData({
            ...formData,
            pais: geoName
        })
        setGeoIds({
            ...geoIds,
            geoIdCountry: idGeoname
        })
        props.uiHook.showLoading()
        await props.entityAddStore.getProvinceListAction(idGeoname.toString())
        props.uiHook.hideLoading()
    }

    const onChangeProvince = async (idGeoname: number, geoName: string, countryCode: string, adminCode: string) => {
        setFormData({
            ...formData,
            provincia: geoName
        })
        setGeoIds({
            ...geoIds,
            geoIdProvince: idGeoname
        })
        props.uiHook.showLoading()
        await props.entityAddStore.getCityListAction(countryCode, adminCode)
        props.uiHook.hideLoading()
    }

    const onChangeCity = async (idGeoname: number, geoName: string) => {
        setFormData({
            ...formData,
            ciudad: geoName
        })
        setGeoIds({
            ...geoIds,
            geoIdCity: idGeoname
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
        geoIds,
        onChangeFormDataHandler,
        onSaveHandler,
        onChangeCountrie,
        onChangeProvince,
        onChangeCity
    }
}