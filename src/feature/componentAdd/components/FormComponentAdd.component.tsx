import { Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FC, useState } from "react";
import { IListadoDescripciones } from "../../categoryList/model/category.model";
import { IComponentAdd } from "../model/componentAdd.model";

interface IFormComponentAddProps {
    componentTypes: IListadoDescripciones[]
    onSave: (newComponent: IComponentAdd, description: string) => void;
}


const regexSoloNumeros = /^[0-9]+$/;

const FormComponentAdd: FC<IFormComponentAddProps> = (props) => {

    const [componentForm, setComponentForm] = useState<IComponentAdd>({
        Altura: '',
        Diametro: '',
        DiametroNominal: '',
        Espesor: '',
        Longitud: '',
        Perfil: '',
        Peso: '',
        Tolerancia: '',
        idAlmacenamiento: "Kg",
        idFraccionamiento: "",
        idDescripcion: 1,
    })
    const [description, setDescription] = useState<string>("BRIDA");
    const onChangeComponentFormHandler = (value: string, nameProperty: string) => {

        if (nameProperty === 'idDescripcion') {
            const textDescription = props.componentTypes.find(type => type.idDescripcion === Number(value))!.NombreDescripcion
            setDescription(textDescription);
        }
        const isNumber = regexSoloNumeros.test(value)
        const stringProperties = ['idAlmacenamiento', 'idFraccionamiento', 'Tolerancia', 'componentTypeId'];

        // Verifica si la propiedad actual es una de las que deben tratarse como string
        const isStringProperty = stringProperties.includes(nameProperty);
        if (!isNumber && !isStringProperty) return
        setComponentForm({
            ...componentForm,
            [nameProperty]: isStringProperty ? value : Number(value)
        })
    }
    const handlerSave = () => {
        console.log(description)
        props.onSave(componentForm, description);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={8}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Tipos de Componente
                        </InputLabel>
                        <Select
                            value={componentForm.idDescripcion}
                            label="Tipos de Componente"
                            onChange={(e) => onChangeComponentFormHandler(e.target.value.toString(), "idDescripcion")}
                            sx={{ fontFamily: "Rubik-SemiBold" }}

                        >
                            {props.componentTypes.map((type) => (
                                <MenuItem value={type.idDescripcion} key={type.idDescripcion}>
                                    {type.NombreDescripcion}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container gap={1}>

                <Grid item xs={12} lg={4}>
                    <TextField
                        label="Diametro"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Diametro}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Diametro")}
                    />
                    <TextField
                        label="Espesor"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Espesor}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Espesor")}
                    />
                    <TextField
                        label="Longitud"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Longitud}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Longitud")}
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TextField
                        label="Altura"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Altura}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Altura")}
                    />
                    <TextField
                        label="Perfil"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Perfil}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Perfil")}
                    />
                    <TextField
                        label="Tolerancía"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.Tolerancia}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Tolerancia")}
                    />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TextField
                        label="Diametro Nominal"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm.DiametroNominal}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "DiametroNominal")}
                    />
                    <TextField
                        label="Peso"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={componentForm?.Peso}
                        onChange={(e) => onChangeComponentFormHandler(e.target.value, "Peso")}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Fraccionamiento
                        </InputLabel>
                        <Select
                            value={componentForm.idFraccionamiento}
                            label="Fraccionamiento"
                            onChange={(e) => onChangeComponentFormHandler(e.target.value, "idFraccionamiento")}
                            sx={{ fontFamily: "Rubik-SemiBold" }}
                        >
                            <MenuItem value={"Centimetro"}>Centimetro</MenuItem>
                            <MenuItem value={"Kilogramo"}>Kilogramo</MenuItem>
                            <MenuItem value={"Unidad"}>Unidad</MenuItem>
                            <MenuItem value={""}>Ninguno</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel sx={{ fontFamily: "Rubik-SemiBold" }}>
                            Almacenamiento
                        </InputLabel>
                        <Select
                            value={componentForm.idAlmacenamiento}
                            label="Almacenamiento"
                            onChange={(e) => onChangeComponentFormHandler(e.target.value, "idAlmacenamiento")}
                            sx={{ fontFamily: "Rubik-SemiBold" }}
                        >
                            <MenuItem value={"Kg"}>Kilogramo</MenuItem>
                            <MenuItem value={"Ud"}>Unidad</MenuItem>
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

