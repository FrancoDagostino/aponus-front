import { useEffect, useState } from "react"
import { ISalesListStore } from "../store/useSalesList.store"
import { IUiHook } from "../../ui/hooks/useUi.hook"
import { ISale } from "../model/salesList.model"



interface ISalesListHookProps {
    salesListStore: ISalesListStore
    uiHook: IUiHook
}

interface ISalesListHook {
    salesList: ISale
    onViewSale: (row: ISale) => void
    onCloseViewSales: () => void
    isOpenViewSales: boolean
    onDeleteFileHandler: (idVenta: string, hashArchivo: string) => void
    onSaveFileHandler: (idVenta: string, file: File) => void
    onPayHandler: (idVenta: string, numeroCuota: number) => void
    onDownloadPDF: (row: ISale) => void
    onClickUpdateStateSaleHandler: (idVenta: string) => void
}

export const useSalesLIstHook = (props: ISalesListHookProps): ISalesListHook => {
    const [isOpenViewSales, setIsOpenViewSales] = useState<boolean>(false)

    const [salesList, setSalesList] = useState<ISale>({
        idVenta: 0,
        fechaHora: "",
        estado: {
            descripcion: "",
            idEstado: 0
        },
        cliente: {
            nombre: "",
            apellido: "",
            nombreClave: "",
            categoria: "",
            idCategoria: 0,
            idFiscal: " ",
            idTipo: 0,
            tipo: ""
        },
        saldoPendiente: 0,
        montoTotal: 0,
        pagos: [],
        idCliente: 0,
        idUsuario: "",
        idEstadoVenta: 0,
        detallesVenta: [],
        cuotas: [],
        infoArchivos: []
    })

    useEffect(() => {
        props.salesListStore.getSalesListAction()
        onInit()
    }, [])


    const onInit = async () => {
        props.uiHook.showLoading()
        await props.salesListStore.getSalesListAction()
        props.uiHook.hideLoading()
    }
    const onViewSale = (row: ISale) => {
        console.log(row)
        setSalesList(row)
        setIsOpenViewSales(true)
    }

    const onCloseViewSales = () => {
        setIsOpenViewSales(false)
    }

    const onDeleteFileHandler = async (idVenta: string, hashArchivo: string) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.removeFileAction(idVenta, hashArchivo)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al eliminar el archivo",
                type: "alert",
            })
        }
    }

    const onSaveFileHandler = async (idVenta: string, file: File) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.saveFileAction(idVenta, file)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al guardar el archivo",
                type: "alert",
            })
        }
        props.uiHook.onSetSnackbar("Archivo guardado correctamente", true)
        setIsOpenViewSales(false)
    }

    const onPayHandler = async (idVenta: string, numeroCuota: number) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.payCuotaAction(idVenta, numeroCuota)
        props.uiHook.hideLoading()
        if (result.isError) {
            props.uiHook.showAlert({
                title: "Error",
                message: "Error al pagar la cuota",
                type: "alert",
            })
            return
        }

        setSalesList({
            ...salesList,
            cuotas: salesList.cuotas.map(cuota => cuota.idCuota === numeroCuota ? { ...cuota, estadoCuota: { ...cuota.estadoCuota, descripcion: "PAGADO" } } : cuota)
        })
    }

    const onDownloadPDF = (row: ISale) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        if (!printWindow) return;

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recibo de Sueldo</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .receipt {
                    border: 1px solid #000;
                    border-radius: 8px;
                    padding: 15px;
                }

                .header {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 20px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #000;
                    padding-bottom: 15px;
                }

                .logo {
                    width: 80px;
                    height: 80px;
                }

                .company-info {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    font-size: 14px;
                }

                .period-table, .employee-table, .details-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 15px;
                }

                .period-table td, .period-table th,
                .employee-table td, .employee-table th,
                .details-table td, .details-table th {
                    border: 1px solid #000;
                    padding: 8px;
                    font-size: 14px;
                }

                .details-table th {
                    background-color: #f5f5f5;
                }

                .totals {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin-top: 15px;
                    border-top: 1px solid #000;
                    padding-top: 15px;
                }

                .signature {
                    margin-top: 100px;
                    border-top: 1px solid #000;
                    width: 200px;
                    text-align: center;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <img src="https://aponus.com.ar/images/logo_chico.png" alt="Logo Aponus" class="logo">
                    <div class="company-info">
                        <div>
                            <strong>APONUS S.A.</strong><br>
                            Dirección: Av. 24 de Septiembre<br>
                            Córdoba<br>
                            C.U.I.T.: 30-71171121-6
                        </div>
                        <div>
                            <strong>No.:</strong> 1140<br>
                            <strong>Piso:</strong> 7<br>
                            <strong>C.P.:</strong> 5000
                        </div>
                        <div>
                            <strong>Documento no valido como factura</strong>
                        </div>
                    </div>
                </div>
                    <table class="employee-table">
                    <tr>
                        <td colspan="3">Cliente</td>
                        <td>C.U.I.L</td>
                    </tr>
                    <tr>
                        <td colspan="3">${row.cliente.nombre} ${row.cliente.apellido}</td>
                        <td>${row.cliente.idFiscal}</td>
                    </tr>
                </table>
                <table class="details-table">
                    <tr>
                        <th>Descripción</th>
                        <th>Cód.</th>
                        <th>Unid.</th>
                        <th>Precio</th>
                    </tr>
                    ${row.detallesVenta.map(detalle => `
                    <tr>
                        <td>${detalle.nombreProducto}</td>
                        <td>${detalle.idProducto}</td>
                        <td>${detalle.cantidad}</td>
                        <td>${detalle.precio}</td>
                    </tr>
                    `).join('')}
                </table>

                <div class="totals">
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                      
                    </div>
                    <div>
                        <strong>Monto Total</strong> ${row.montoTotal}
                    </div>
                </div>
            
            </div>
        </body>
        </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.onload = function () {
            printWindow.print();
            printWindow.close();
        };
    }

    const onClickUpdateStateSaleHandler = async (idVenta: string) => {
        props.uiHook.showLoading()
        const result = await props.salesListStore.updateStateSaleAction(idVenta)
        if (result.isError) {
            props.uiHook.showAlert({
                message: "Error al actualizar el estado de la venta",
                type: "alert",
                title: "Error"
            })
        }
        props.uiHook.hideLoading()
        props.uiHook.onSetSnackbar("Estado de venta actualizada correctamente", true)
    }

    return {
        salesList,
        onViewSale,
        onCloseViewSales,
        isOpenViewSales,
        onDeleteFileHandler,
        onSaveFileHandler,
        onPayHandler,
        onDownloadPDF,
        onClickUpdateStateSaleHandler
    }
}