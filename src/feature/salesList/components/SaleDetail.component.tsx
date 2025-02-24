import { FC, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    IconButton,
} from '@mui/material';
import { ISale } from '../model/salesList.model';
import { CheckOutlined } from '@mui/icons-material';


interface ISaleDetailComponentProps {
    paymentList: ISale["cuotas"]
    idVenta: string
    onPayHandler: (idVenta: string, idCuota: number) => void
}

export const SaleDetailComponent: FC<ISaleDetailComponentProps> = (props) => {
    const [paymentList, setPaymentList] = useState<ISale["cuotas"]>(props.paymentList)

    useEffect(() => {
        setPaymentList(props.paymentList)
    }, [props.paymentList])

    return (
        <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
            <Table aria-label="tabla de pagos">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha de Vencimiento</TableCell>
                        <TableCell>Fecha de Pago</TableCell>
                        <TableCell>Monto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentList.map((payment) => (
                        <TableRow key={payment.idCuota}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.fechaVencimiento}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {payment.fechaPago ?? "No pagado"}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>${payment.monto.toFixed(2)}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{payment.estadoCuota.descripcion}</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Tooltip title="Pagada">
                                    <IconButton color="primary" onClick={() => props.onPayHandler(payment.idVenta.toString(), payment.idCuota)}>
                                        <CheckOutlined />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}