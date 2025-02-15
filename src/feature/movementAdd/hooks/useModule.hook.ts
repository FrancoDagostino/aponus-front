import { useEffect, useState } from "react";
import { IMovementAddStore } from "../store/useMovementAdd.store";
import { IUiHook } from "../../ui/hooks/useUi.hook";
import { SelectChangeEvent } from "@mui/material";



export interface IFormData {
    idProvider: number;
    sourceProcess: string;
    destinationProcess: string;
    files: File[];
    supplyItem: ISupplyItem[]
}

export interface ISupplyItem {
    id: string;
    name: string;
    quantity: string;
}

export interface IProviderList {
    name: string,
    id: number
}

interface IMovementAddHookProps {
    movementAddStore: IMovementAddStore;
    uiHook: IUiHook
    onNavigate: (url: string) => void;

}

interface IMovementAddHook {
    formData: IFormData
    providerList: IProviderList[]
    onAddInputFilesHanlder: (validFiles: File[]) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onChangeFormDataHandler: (event: SelectChangeEvent<string>) => void
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onSaveHandler: () => void
}

export const useMovementAddHook = (props: IMovementAddHookProps): IMovementAddHook => {
    const [providerList, setProviderList] = useState<IProviderList[]>([])
    const [formData, setFormData] = useState<IFormData>({
        idProvider: 0,
        sourceProcess: 'recibido',
        destinationProcess: 'pintura',
        files: [],
        supplyItem: []
    })

    useEffect(() => {
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.movementAddStore.getSupplyListAction()
        props.uiHook.hideLoading()

        const result = await props.movementAddStore.getEntityListAction("1")

        if (result.isError) return

        setProviderList(result.data.map(provider => {
            return {
                id: provider.idEntidad,
                name: `${provider.nombre} ${provider.apellido}`
            }
        }))

        setFormData({
            ...formData,
            idProvider: result.data[0].idEntidad
        })

    }


    const onChangeFormDataHandler = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const onAddInputFilesHanlder = (files: File[]) => {
        setFormData(prevData => ({
            ...prevData,
            files: [...prevData.files, ...files]
        }))
    }

    const onRemoveFileHandler = (fileToDelete: File) => {
        setFormData(prevData => ({
            ...prevData,
            files: prevData.files.filter(file => file !== fileToDelete)
        }))
    }

    const onAddSupplyItemHandler = (supplyItem: ISupplyItem[]) => {
        setFormData({
            ...formData,
            supplyItem
        })
    }
    const onSaveHandler = () => {
        props.movementAddStore.createNewMovementAction(formData)
    }

    return {
        formData,
        providerList,
        onAddInputFilesHanlder,
        onRemoveFileHandler,
        onChangeFormDataHandler,
        onAddSupplyItemHandler,
        onSaveHandler
    }
}