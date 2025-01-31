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


interface IPucharseDetailComponentProps {
    pucharse: IPucharse["pagos"]
}

export const PucharseDetailComponent: FC<IPucharseDetailComponentProps> = (props) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
            <Table aria-label="tabla de pagos">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Medio de Pago</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Descripción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.pucharse.map((payment) => (
                        <TableRow key={payment.idPago}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.fecha}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.medioPago.descripcion}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>${payment.monto.toFixed(2)}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{payment.entidadesPago.descripcion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}