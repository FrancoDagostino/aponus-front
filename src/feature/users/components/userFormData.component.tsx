import { Box, SelectChangeEvent, Typography, Grid, FormControl, InputLabel, TextField, MenuItem, Select, Button } from "@mui/material"
import { IUserView } from "../hooks/useUser.hook"
import { IRol } from "../models/user.model"
interface IUserFormDataProps {
    formData: IUserView
    onChangeUserHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    roles: IRol[]
    onSaveHandler: () => void
}


export const UserFormData = (props: IUserFormDataProps) => {
    return (
        <Box sx={{ my: 4, ml: 4, mr: 4, mt: 4 }}>
            <Typography variant="h4">Formulario De Usuario</Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        variant="standard"
                        name="usuario"
                        value={props.formData.usuario}
                        onChange={props.onChangeUserHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Correo"
                        variant="standard"
                        name="correo"
                        value={props.formData.correo}
                        onChange={props.onChangeUserHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Contraseña"
                        variant="standard"
                        name="contraseña"
                        value={props.formData.contraseña}
                        onChange={props.onChangeUserHandler}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Roles</InputLabel>
                        <Select
                            name="idRol"
                            value={props.formData.idRol}
                            variant="standard"
                            label="Roles"
                            onChange={props.onChangeUserHandler}
                        >
                            {props.roles.map((role) => (
                                <MenuItem key={role.idRol} value={role.idRol}>{role.nombreRol}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item justifyContent={"flex-end"} xs={12} marginBottom={5}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={props.onSaveHandler}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>

        </Box>
    )
}   
