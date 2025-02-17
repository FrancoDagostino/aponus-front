import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IAuditoria } from "../models/auditoria.model"
import { IAuditoriaStore } from "../store/useAudotria.store"
import { useState, useEffect } from "react"


export interface IUseAuditoriaHookProps {
    auditoriaStore: IAuditoriaStore
    uiHook: IUiHook
}

export interface IUseAuditoriaHook {
    isOpen: boolean
    openModal: (row: IAuditoria) => void
    closeModal: () => void
    newValueAudit: string
}


export const useAuditoriaHook = (props: IUseAuditoriaHookProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [newValueAudit, setNewValueAudit] = useState("")
    useEffect(() => {
        onInit()
    }, [])

    const onInit = async () => {
        props.uiHook.showLoading()
        const result = await props.auditoriaStore.getAuditoriaAction()
        props.uiHook.hideLoading()
        if (result.isError) return
    }

    const openModal = (row: IAuditoria) => {
        setIsOpen(true),
            setNewValueAudit(row.valoresNuevos)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        openModal,
        closeModal,
        newValueAudit
    }
}

