import { FC, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import './dataGrid.css'
import { Tooltip, IconButton, TablePagination, TableContainer, Table, TableHead, Grid, Paper, TableBody, TableCell, TableRow, useMediaQuery } from "@mui/material";
import { Search } from "@mui/icons-material";
import { IMovimientoStock } from "../model/movementList.model";

interface IActivityDataGridComponentProps {
    movementList: IMovimientoStock[]
    searchValue: string
    onEditMovementHandler: (id: number) => void
    onViewMovementHandler: (row: IMovimientoStock) => void
    // handleOpen: (row: any, isDisabled: boolean) => void
}

export const MovementListableComponent: FC<IActivityDataGridComponentProps> = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = props.movementList.length
    const minScreen = useMediaQuery('(min-width: 1300px)');
    useEffect(() => {
        setPage(0)
    }, [props.searchValue])


    const startIndex = (page + 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = props.movementList.slice(startIndex, endIndex)
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
                                    <TableCell>Origen</TableCell>
                                    <TableCell>Destino</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Usuario</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow key={row.idMovimiento}>
                                        <TableCell sx={{ textAlign: "center" }}>{row.fechaHoraCreado}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.proveedorDestino?.nombreClave !== "" ? row.proveedorDestino?.nombreClave : `${row.proveedorDestino?.nombre} ${row.proveedorDestino?.apellido}`}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.origen}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.destino}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.estado}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.usuarioCreacion}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>
                                            <Tooltip title="Ver">
                                                <IconButton color="primary" onClick={() => props.onViewMovementHandler(row)}>
                                                    <Search />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton color="error" onClick={() => { }}>
                                                    <DeleteIcon />
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
                        <ExpedientListDataGridMobile key={item.id} item={item} navigateEdit={props.navigateEdit} navigateView={props.navigateView} onRemoveAgenda={props.onRemoveAgenda} />
                    ))} */}
                </>
            )}
        </>
    )
}