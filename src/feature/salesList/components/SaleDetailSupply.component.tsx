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
import { ISale } from '../model/salesList.model';


interface ISaleDetailSupplyComponentProps {
    details: ISale["detallesVenta"]
}

export const SalesDetailSupplyComponent: FC<ISaleDetailSupplyComponentProps> = (props) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
            <Table aria-label="tabla de detalles">
                <TableHead>
                    <TableRow>
                        <TableCell>Insumo</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.details.map((detail) => (
                        <TableRow key={detail.idVenta}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {detail.nombreProducto}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{detail.cantidad}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{detail.precio}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{detail.subTotal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}