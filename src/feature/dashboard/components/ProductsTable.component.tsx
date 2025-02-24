import { FC, useEffect, useState } from "react";
import './dataGrid.css'
import { TablePagination, TableContainer, Table, TableHead, Grid, Paper, TableBody, TableCell, TableRow, useMediaQuery } from "@mui/material";
import { IProducts } from "../models/dashboard.model"
interface IActivityDataGridComponentProps {
    products: IProducts[]
    searchValue: string
}

export const ProductsTableComponent: FC<IActivityDataGridComponentProps> = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = props.products.length
    const minScreen = useMediaQuery('(min-width: 1300px)');
    useEffect(() => {
        setPage(0)
    }, [props.searchValue])


    const startIndex = (page) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = props.products.slice(startIndex, endIndex)
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
                                    <TableCell>Descripcion</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentData.map((row) => (
                                    <TableRow key={row.tolerancia}>
                                        <TableCell sx={{ textAlign: "right" }}> {row.descripcion} Diametro Nominal:{row.diametroNominal} - Tolerancia:{row.tolerancia} </TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{row.cantidad}</TableCell>
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