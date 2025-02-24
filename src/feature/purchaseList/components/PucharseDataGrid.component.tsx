import { FC, useEffect, useState } from "react";
import './dataGrid.css'
import { Tooltip, IconButton, TablePagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, useMediaQuery } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { IPucharse } from "../model/pucharseList.model";
import { Download } from "@mui/icons-material";


interface IPurchaseDataGridComponentProps {
    purchaseList: IPucharse[]
    searchValue: string
    onViewPucharse: (row: IPucharse) => void
    onRemovePucharse: (id: string) => void
    onDownloadPDF: (row: IPucharse) => void
}

export const PurchaseDataGridComponent: FC<IPurchaseDataGridComponentProps> = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = props.purchaseList.length;
    const minScreen = useMediaQuery('(min-width: 1300px)');

    useEffect(() => {
        setPage(0)
    }, [props.searchValue])


    const startIndex = (page) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = props.purchaseList.slice(startIndex, endIndex)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        event?.preventDefault()
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            {minScreen ? (
                <>
                    <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                        <Table sx={{ tableLayout: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Proveedor</TableCell>
                                    <TableCell>Saldo Pendiente</TableCell>
                                    <TableCell>Saldo Total</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow key={row.idCompra}>
                                        <TableCell sx={{ textAlign: "center" }}>{row.fechaHora}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.proveedor.nombreClave !== "" ? row.proveedor.nombreClave : `${row.proveedor.nombre} ${row.proveedor.apellido}`}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.saldoPendiente}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.montoTotal}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Tooltip title="Ver">
                                                <IconButton color="primary" onClick={() => props.onViewPucharse(row)}>
                                                    <Search />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Descargar PDF">
                                                <IconButton color="primary" onClick={() => props.onDownloadPDF(row)}>
                                                    <Download />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={12} sx={{ mb: 5 }}>
                        <TablePagination
                            component="div"
                            labelRowsPerPage={"Cantidad de filas por página"}
                            count={totalPages}
                            rowsPerPageOptions={[10, 25, 50]}
                            size={"small"}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </>
            ) : (
                <>
                    {/* {currentData.map((item) => (
                        <ComunicationDataGridMobile key={item.id} item={item} handleOpen={props.handleOpen} onCheckedComunication={props.onCheckedComunication} onRemoveComunication={props.onRemoveComunication} />
                    ))} */}
                </>
            )}
        </>
    )
}