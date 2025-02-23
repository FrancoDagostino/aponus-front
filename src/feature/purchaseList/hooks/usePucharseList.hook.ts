import { useEffect, useState } from "react"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { IPurchaseListStore as IPurchaseListStore } from "../store/usePurcharseList.store"
import { IPucharse } from "../model/pucharseList.model"

interface IPurchaseListHookProps {
    uiHook: IUiHook
    purchaseListStore: IPurchaseListStore
}


interface IPurchaseListHook {
    onViewPurchase: (row: IPucharse) => void
    onRemovePurchase: (id: string) => void
    onCloseViewPucharse: () => void
    purchaseState: IPucharse
    isOpenViewPucharse: boolean
    onSaveFile: (idCompra: string, file: File) => Promise<void>
    onRemoveFile: (idCompra: string, hashArchivo: string) => Promise<void>
    onDownloadPDF: (row: IPucharse) => void
}


export const usePurchaseListHook = (props: IPurchaseListHookProps): IPurchaseListHook => {
    const [isOpenViewPucharse, setIsOpenViewPucharse] = useState<boolean>(false)
    const [purchaseState, setPurchaseState] = useState<IPucharse>({
        fechaHora: "",
        idCompra: 0,
        cuotas: [],
        detallesCompra: [],
        estado: { descripcion: '', idEstadoCompra: 0 },
        idProveedor: 0,
        idUsuario: "0",
        saldoCancelado: 0,
        usuario: "",
        pagos: [],
        proveedor: {
            apellido: "",
            categoria: "",
            idCategoria: 0,
            idEntidad: 0,
            idFiscal: "0",
            idTipo: 0,
            tipo: '',
            nombre: "",
            nombreClave: ""
        },
        saldoPendiente: 0,
        montoTotal: 0
    })

    useEffect(() => {
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.purchaseListStore.getPurchaseListAction()
        props.uiHook.hideLoading()
    }

    const onViewPurchase = (row: IPucharse) => {
        setPurchaseState(row)
        setIsOpenViewPucharse(true)
    }

    const onCloseViewPucharse = () => {
        setIsOpenViewPucharse(false)
    }

    const onRemovePurchase = (id: string) => {
        id
    }


    const onSaveFile = async (idCompra: string, file: File) => {
        props.uiHook.showLoading()
        const result = await props.purchaseListStore.saveFileAction(idCompra, file)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al guardar el archivo",
                type: "alert",
            })
        }
    }

    const onRemoveFile = async (idCompra: string, hashArchivo: string) => {
        props.uiHook.showLoading()
        const result = await props.purchaseListStore.removeFileAction(idCompra, hashArchivo)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar el archivo",
                type: "alert",
            })
        }
    }

    const onDownloadPDF = (row: IPucharse) => {
        // Create a new window
        const printWindow = window.open('', '', 'height=600,width=800');
        if (!printWindow) return;

        // Generate HTML content using the row data
        const htmlContent = `
            <html>
                <head>
                    <title>Detalles de la Compra</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #333; text-align: center; }
                        .section { margin: 20px 0; }
                        .section-title { font-weight: bold; margin-bottom: 10px; font-size: 1.2em; }
                        .field { margin: 5px 0; }
                        .field-label { font-weight: bold; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #000; padding: 5px; text-align: center; }
                        th { background-color: #f0f0f0; }
                        img { display: block; margin: 0 auto 20px; max-width: 100%; height: auto; }
                    </style>
                </head>
                <body>
                    <h1>Detalles de la Compra</h1>
                    
                    <!-- Add your image here -->
                    <img src="https://aponus.com.ar/images/logo_chico.png" alt="Descripción de la imagen" />

                    <div class="section">
                        <div class="section-title">Datos del Proveedor</div>
                        <div class="field"><span class="field-label">Nombre:</span> ${row.proveedor.nombre} ${row.proveedor.apellido}</div>
                        <div class="field"><span class="field-label">CUIT:</span> ${row.proveedor.idFiscal}</div>
                    </div>

                    <div class="section">
                        <div class="section-title">Detalles de la Compra</div>
                        <div class="field"><span class="field-label">Fecha de Compra:</span> ${row.fechaHora}</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Cód.</th>
                                <th>Unid.</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${row.detallesCompra.map(item => `
                                <tr>
                                    <td>${item.nombreInsumo}</td>
                                    <td>${item.idInsumo}</td>
                                    <td>${item.cantidad}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="section">
                        <div class="section-title">Finanzas</div>
                        <div class="field"><span class="field-label">Monto Total:</span> ${row.montoTotal}</div>
                        <div class="field"><span class="field-label">Saldo Pendiente:</span> ${row.saldoPendiente}</div>
                        <div class="field"><span class="field-label">Saldo Cancelado:</span> ${row.saldoCancelado}</div>
                    </div>
                    <div class="section">
                        <div class="section-title">Detalles de los Pagos</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                            <th>Tipo</th>
                            <th>Descripcion Entidad</th>
                            <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${row.pagos.map(item => `
                                <tr>
                                <td>${item.entidadesPago.tipo}</td>
                                <td>${item.entidadesPago.descripcion}</td>
                                <td>${item.monto}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        // Write content to the new window
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };
    }



    return {
        purchaseState,
        isOpenViewPucharse,
        onViewPurchase,
        onRemovePurchase,
        onCloseViewPucharse,
        onSaveFile,
        onRemoveFile,
        onDownloadPDF
    }
}   