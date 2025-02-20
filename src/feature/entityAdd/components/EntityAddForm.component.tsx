import React, { FC } from 'react';
import { TextField, Button, Grid, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IFormData, IGeoNames } from '../hook/useModule.hook';
import { ICountries, IGeoCity, IGeoProvice } from '../../entityList/model/EntityList.model';
import { ICategoria } from '../model/entityAdd.model';


interface IEntityAddFormProps {
    formData: IFormData
    countryListState: ICountries
    geoIds: IGeoNames
    provinceListState: IGeoProvice[]
    cityListState: IGeoCity
    categoriaListState: ICategoria[]
    onChangeFormData: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    onSaveHandler: () => void
    onChangeCountrie: (idGeoname: number, geoName: string) => void
    onChangeProvince: (idGeoname: number, geoName: string, countryCode: string, adminCode: string) => void
    onChangeCity: (idGeoname: number, geoName: string) => void
    onChangeIdTipo: (idTipo: number) => void
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
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="destination-provider-label">Seleccionar Pais</InputLabel>
                            <Select
                                labelId="destination-provider-label"
                                id="geoIdCountry"
                                name="geoIdCountry"
                                value={props.geoIds.geoIdCountry}
                                label="Seleccionar Pais"
                                onChange={(event) => {
                                    const selectedId = event.target.value as number;
                                    const selectedCountry = props.countryListState.geonames.find(
                                        (c) => c.geonameId === selectedId
                                    );

                                    if (selectedCountry) {
                                        props.onChangeCountrie(selectedId, selectedCountry.countryName);
                                    }
                                }}
                            >
                                <MenuItem value="0">Seleccionar País</MenuItem>
                                {
                                    props.countryListState.geonames.map(countrie => (
                                        <MenuItem key={countrie.geonameId} value={countrie.geonameId}>{countrie.countryName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="destination-provider-label">Seleccionar Provincía</InputLabel>
                            <Select
                                labelId="destination-provider-label"
                                id="geoIdProvince"
                                name="geoIdProvince"
                                value={props.geoIds.geoIdProvince}
                                label="Seleccionar Provincía"
                                onChange={(event) => {
                                    const selectedId = event.target.value as number;
                                    const selectedProvince = props.provinceListState.find(
                                        (c) => c.geonameId === selectedId.toString()
                                    );

                                    if (selectedProvince) {
                                        props.onChangeProvince(selectedId, selectedProvince.toponymName, selectedProvince.countryCode, selectedProvince.adminCode1);
                                    }
                                }}
                            >
                                <MenuItem value="0">Seleccionar Provincía</MenuItem>
                                {
                                    props.provinceListState.map(province => (
                                        <MenuItem key={province.geonameId} value={province.geonameId}>{province.toponymName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="destination-provider-label">Seleccionar Ciudad</InputLabel>
                            <Select
                                labelId="destination-provider-label"
                                id="geoIdCity"
                                name="geoIdCity"
                                value={props.geoIds.geoIdCity}
                                label="Seleccionar Ciudad"
                                onChange={(event) => {
                                    const selectedId = event.target.value as number;
                                    const selectedCity = props.cityListState.geonames.find(
                                        (c) => c.geonameId === selectedId.toString()
                                    );

                                    if (selectedCity) {
                                        props.onChangeCity(selectedId, selectedCity.toponymName);
                                    }
                                }}
                            >
                                <MenuItem value="0">Seleccionar Ciudad</MenuItem>
                                {
                                    props.cityListState.geonames.map(city => (
                                        <MenuItem key={city.toponymName} value={city.geonameId}>{city.toponymName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
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
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="destination-provider-label">Seleccionar Tipo</InputLabel>
                            <Select
                                labelId="destination-provider-label"
                                id="idTipo"
                                name="idTipo"
                                value={props.formData.idTipo.toString()}
                                label="Seleccionar Tipo"
                                onChange={(e) => props.onChangeIdTipo(Number(e.target.value))}
                            >

                                <MenuItem key={1} value={1}>{"Clientes"}</MenuItem>
                                <MenuItem key={2} value={2}>{"Proveedores"}</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="destination-provider-label">Seleccionar Tipo</InputLabel>
                            <Select
                                labelId="destination-provider-label"
                                id="idTipo"
                                name="idCategoria"
                                value={props.formData.idCategoria.toString()}
                                label="Seleccionar Categoria"
                                onChange={props.onChangeFormData}
                            >

                                {
                                    props.categoriaListState.map(categoria => (
                                        <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombreCategoria}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
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