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


interface ISaleDetailComponentProps {
    paymentList: ISale["cuotas"]
}

export const SaleDetailComponent: FC<ISaleDetailComponentProps> = (props) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
            <Table aria-label="tabla de pagos">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha de Vencimiento</TableCell>
                        <TableCell>Fecha de Pago</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.paymentList.map((payment) => (
                        <TableRow key={payment.numeroCuota}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.fechaVencimiento}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.fechaPago ?? "No pagado"}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>${payment.monto.toFixed(2)}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{payment.estadoCuota.descripcion}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}