import { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { IPucharse } from '../model/pucharseList.model';


interface IPucharseDetailSupplyComponentProps {
    details: IPucharse["detallesCompra"]
}

export const PucharseDetailSupplyComponent: FC<IPucharseDetailSupplyComponentProps> = (props) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
            <Table aria-label="tabla de detalles">
                <TableHead>
                    <TableRow>
                        <TableCell>Insumo</TableCell>
                        <TableCell>Cantidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.details.map((detail) => (
                        <TableRow key={detail.idCompra}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {detail.idInsumo}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{detail.cantidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}