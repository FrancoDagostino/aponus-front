import React from "react"
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { IQuatationList } from "../model/sales.model"


interface IQuatationListComponentProps {
    quatationList: IQuatationList[]
}

export const QuatationListComponent = (props: IQuatationListComponentProps) => {
    return (
        <Paper elevation={3} sx={{ maxWidth: 400, mt: 4 }}>
            <List>
                {props.quatationList.map((quatation) => (
                    <ListItem key={quatation.numeroCuota} divider>
                        <ListItemText
                            primary={`Cuota ${quatation.numeroCuota}`}
                            secondary={
                                <React.Fragment>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        Monto: ${quatation.monto.toFixed(2)}
                                    </Typography>
                                    <br />
                                    <Typography component="span" variant="body2" color="text.secondary">
                                        Vencimiento: {quatation.fechaVencimiento}
                                    </Typography>
                                    <br />
                                    <Typography marginTop={2} component="span" variant="body2" color="text.secondary">
                                        Pediente de Pago
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

