import { FC, useEffect, useState } from "react";
import './dataGrid.css'
import { TablePagination, TableContainer, Table, TableHead, Grid, Paper, TableBody, TableCell, TableRow, useMediaQuery } from "@mui/material";
import { IPendingSales } from "../models/dashboard.model"
interface IActivityDataGridComponentProps {
    pendingSales: IPendingSales[]
    searchValue: string
}

export const PendingSalesTableComponent: FC<IActivityDataGridComponentProps> = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = props.pendingSales.length
    const minScreen = useMediaQuery('(min-width: 1300px)');
    useEffect(() => {
        setPage(0)
    }, [props.searchValue])


    const startIndex = (page) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = props.pendingSales.slice(startIndex, endIndex)
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
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Monto Total</TableCell>
                                    <TableCell>Saldo Pendiente</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow key={row.fecha}>
                                        <TableCell sx={{ textAlign: "center" }}>{row.fecha}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.cliente}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.montoTotal}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.saldoPendiente}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.estado}</TableCell>
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
                        <ExpedientListDataGridMobile key={item.id} item={item} navigateEdit={props.navigateEdit} navigateView={props.navigateView} onRemoveAgenda={props.onRemoveAgenda} />
                    ))} */}
                </>
            )}
        </>
    )
}