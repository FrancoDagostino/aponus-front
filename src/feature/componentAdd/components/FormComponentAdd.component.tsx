import { Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FC } from "react";
import { IListadoDescripciones } from "../../categoryList/model/category.model";
import { IComponentAdd } from "../model/componentAdd.model";

interface IFormComponentAddProps {
    componentTypes: IListadoDescripciones[]
    componentForm: IComponentAdd
    description: string
    onAddOrUpdateComponentHandler: () => void
    onChangeComponentFormHandler: (value: string, nameProperty: string) => void
    isEdit: boolean
}


const FormComponentAdd: FC<IFormComponentAddProps> = (props) => {

    const handlerSave = () => {
        props.onAddOrUpdateComponentHandler()
    }
    return (
        <>
            <Grid container spacing={3} >
                <Grid item xs={12} lg={8}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Tipos de Componente
                        </InputLabel>
                        <Select
                            value={props.componentForm.idDescripcion}
                            label="Tipos de Componente"
                            onChange={(e) => props.onChangeComponentFormHandler(e.target.value.toString(), "idDescripcion")}
                            name="idDescripcion"
                            sx={{ fontFamily: "Rubik-SemiBold" }}
                            disabled={props.isEdit}

                        >
                            {props.componentTypes.map((type) => (
                                <MenuItem value={type.idDescripcion} key={type.idDescripcion}>
                                    {type.nombreDescripcion}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }} spacing={2}>

                <Grid item xs={12} lg={4} >
                    <TextField
                        sx={{ mb: 1 }}
                        label="Diametro"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Diametro}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Diametro")}
                    />
                    <TextField
                        sx={{ mb: 1 }}
                        label="Espesor"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Espesor}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Espesor")}
                    />
                    <TextField
                        sx={{ mb: 1 }}
                        label="Longitud"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Longitud}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Longitud")}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TextField
                        sx={{ mb: 1 }}
                        label="Altura"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Altura}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Altura")}
                    />
                    <TextField
                        sx={{ mb: 1 }}
                        label="Perfil"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Perfil}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Perfil")}
                    />
                    <TextField
                        sx={{ mb: 1 }}
                        label="Tolerancía"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.Tolerancia}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Tolerancia")}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TextField
                        sx={{ mb: 1 }}
                        label="Diametro Nominal"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm.DiametroNominal}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "DiametroNominal")}
                    />
                    <TextField
                        label="Peso"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={props.componentForm?.Peso}
                        onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "Peso")}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Fraccionamiento
                        </InputLabel>
                        <Select
                            value={props.componentForm.idFraccionamiento}
                            label="Fraccionamiento"
                            onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "idFraccionamiento")}
                            sx={{ fontFamily: "Rubik-SemiBold" }}
                        >
                            <MenuItem value={"CM"}>Centimetro</MenuItem>
                            <MenuItem value={"KG"}>Kilogramo</MenuItem>
                            <MenuItem value={"UD"}>Unidad</MenuItem>
                            <MenuItem value={"Nin"}>Ninguno</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Almacenamiento
                        </InputLabel>
                        <Select
                            value={props.componentForm.idAlmacenamiento}
                            label="Almacenamiento"
                            onChange={(e) => props.onChangeComponentFormHandler(e.target.value, "idAlmacenamiento")}
                            sx={{ fontFamily: "Rubik-SemiBold" }}
                        >
                            <MenuItem value={"KG"}>Kilogramo</MenuItem>
                            <MenuItem value={"UD"}>Unidad</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
                <Grid item xs={12} lg={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handlerSave}
                    >
                        Guardar
                    </Button>
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Button
                        variant="outlined"
                        fullWidth
                        color="warning"
                        onClick={() => ({})}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default FormComponentAdd

