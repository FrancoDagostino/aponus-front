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
import { IMovimientoStock } from '../model/movementList.model';


interface IMovementDetailSupplyComponentProps {
    suministros: IMovimientoStock["Suministros"]
}

export const MovementDetailSupplyComponent: FC<IMovementDetailSupplyComponentProps> = (props) => {
    console.log(props.suministros)
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
                    {props.suministros.map((detail) => (
                        <TableRow key={detail.idMovimiento}>
                            <TableCell sx={{ textAlign: "center" }}>
                                {detail.nombreSuministro}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{detail.cantidad}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}