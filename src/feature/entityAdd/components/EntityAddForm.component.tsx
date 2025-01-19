import React, { FC } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { IFormData } from '../hook/useModule.hook';



interface IEntityAddFormProps {
    formData: IFormData
    onChangeFormData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onSaveHandler: () => void
}

export const EntityAddFormComponent: FC<IEntityAddFormProps> = (props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <Grid xs={10} sx={{ marginLeft: 4, marginRight: 4, marginTop: 4 }}>
            <Typography variant="h5" gutterBottom align="center" mb={4}>
                Formulario Nueva Entidad
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.nombreClave} label="Nombre Clave" name="nombreClave" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.nombre} label="Nombre" name="nombre" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.apellido} label="Apellido" name="apellido" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.pais} label="País" name="pais" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.ciudad} label="Ciudad" name="ciudad" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.provincia} label="Provincia" name="provincia" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.localidad} label="Localidad" name="localidad" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.calle} label="Calle" name="calle" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.altura} label="Altura" name="altura" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.codigoPostal} label="Código Postal" name="codigoPostal" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.barrio} label="Barrio" name="barrio" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.telefono1} label="Teléfono 1" name="telefono1" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.telefono2} label="Teléfono 2" name="telefono2" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.telefono3} label="Teléfono 3" name="telefono3" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.email} label="Email" name="email" type="email" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField fullWidth onChange={props.onChangeFormData} value={props.formData.idFiscal} label="ID Fiscal" name="idFiscal" variant="outlined" required />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => props.onSaveHandler()}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
}