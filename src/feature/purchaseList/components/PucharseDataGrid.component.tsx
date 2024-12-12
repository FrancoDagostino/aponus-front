import { FC, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import './dataGrid.css'
import { Tooltip, IconButton, TablePagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, useMediaQuery } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { ICompras } from "../../entityList/model/EntityList.model";


interface IPurchaseDataGridComponentProps {
    purchaseList: ICompras[]
    searchValue: string
    onViewPucharse: (row: ICompras) => void
    onRemovePucharse: (id: string) => void
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
                                        <TableCell sx={{ textAlign: "center" }}>{row.proveedor.nombre} {row.proveedor.apellido}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.saldoPendiente}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.montoTotal}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Tooltip title="Ver">
                                                <IconButton color="primary" onClick={() => props.onViewPucharse(row)}>
                                                    <Search />
                                                </IconButton>
                                            </Tooltip>
                                            {/* <Tooltip title="Editar">
                                                <IconButton color="primary" onClick={() => props.onViewPucharse(row, false)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip> */}
                                            <Tooltip title="Eliminar">
                                                <IconButton color="error" onClick={() => props.onRemovePucharse(row.idCompra)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={12}>
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