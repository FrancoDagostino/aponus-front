import { createResultUtil, TResult } from '../../../utils/result.util';
import { IEntityAddService } from "../service/useEntityAdd.service";
import { IFormData } from "../hook/useModule.hook";
import { IEntity } from '../model/entityAdd.model';
import { useState } from 'react';
import { ICountries, IGeoCity, IGeoProvice } from '../../entityList/model/EntityList.model';

export interface IEntityAddStore {
    countryListState: ICountries
    provinceListState: IGeoProvice[]
    cityListState: IGeoCity
    addNewEntityAction: (dataInput: IFormData) => Promise<TResult<null, null>>
    getNewEntityAction: (entityId: string) => Promise<TResult<IEntity[], null>>
    editEntityAction: (dataInput: IFormData, idEntity: number) => Promise<TResult<null, null>>
    getPaisList: () => Promise<TResult<ICountries, null>>
    getProvinceListAction: (geonameId: string) => Promise<TResult<IGeoProvice[], null>>
    getCityListAction: (countryCode: string, adminCode: string) => Promise<TResult<IGeoCity, null>>
}

interface IEntityAddStoreProps {
    entityAddService: IEntityAddService

}

export const useEntityAddStore = (props: IEntityAddStoreProps): IEntityAddStore => {
    const [countryListState, setCountryListState] = useState<ICountries>({
        geonames: []
    })

    const [provinceListState, setProvinceListState] = useState<IGeoProvice[]>([])

    const [cityListState, setCityListState] = useState<IGeoCity>({
        geonames: []
    })

    const getCityListAction: IEntityAddStore["getCityListAction"] = async (countryCode: string, adminCode: string) => {
        const result = await props.entityAddService.getCityList(countryCode, adminCode)
        if (result.isError) return createResultUtil.error(null)
        setCityListState(result.data)
        return createResultUtil.success(result.data)
    }
    const getProvinceListAction: IEntityAddStore["getProvinceListAction"] = async (geonameId: string) => {
        const result = await props.entityAddService.getProvinceList(geonameId)
        if (result.isError) return createResultUtil.error(null)
        setProvinceListState(result.data)
        return createResultUtil.success(result.data)
    }

    const getPaisList: IEntityAddStore["getPaisList"] = async () => {
        const result = await props.entityAddService.getPaisList()
        if (result.isError) return createResultUtil.error(null)
        setCountryListState(result.data)
        return createResultUtil.success(result.data)
    }
    const addNewEntityAction: IEntityAddStore["addNewEntityAction"] = async (dataInput: IFormData) => {
        const result = await props.entityAddService.newEntity(dataInput)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }

    const getNewEntityAction = async (entityId: string) => {
        const result = await props.entityAddService.getEntity(entityId)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(result.data)
    }

    const editEntityAction = async (dataInput: IFormData, idEntity: number) => {
        const result = await props.entityAddService.editEntity(dataInput, idEntity)
        if (result.isError) return createResultUtil.error(null)
        return createResultUtil.success(null)
    }


    return {
        countryListState,
        provinceListState,
        cityListState,
        getCityListAction,
        getProvinceListAction,
        getPaisList,
        addNewEntityAction,
        getNewEntityAction,
        editEntityAction
    }
}
