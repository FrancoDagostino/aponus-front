
import React, { FC } from 'react';
import {
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProductDescription, IProductType, IStorageSupplie, ISupplie } from '../model/productAdd.model';

interface IProduct {
    idTipo: string
    idDescripcion: string
    diametroNominal: string
    tolerancia: string
}
export interface Component {
    id: string;
    category: string;
    quantity: string;
    type: string;
}

interface IProductAddForm {
    formData: IProduct
    suppliesListComputed: ISupplie[]
    supplieStorageList: IStorageSupplie[]
    productTypeList: IProductType[]
    productDescription: IProductDescription[]
    componentCategory: {
        idComponent: string;
        description: string;
        idAlmacenamiento: string;
    }
    components: Component[]
    componentQuantity: string,
    componentId: string
    onChangeTypeProduct: (idType: string) => void
    onChangeComponentCategory: (productCategory: string) => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onChangeProductDescription: (idDescription: string) => void
    onSaveHandler: () => void
    handleAddComponent: () => void
    handleRemoveComponent: (id: string) => void
    handleSetIdComponent: (idComponent: string) => void
    handleSetQuantity: (quantity: string) => void
}

export const ProductAddForm: FC<IProductAddForm> = (props) => {








    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };





    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Producto
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="test-select-label">Tipos de Producto</InputLabel>
                            <Select
                                labelId="test-select-label"
                                label="Tipos de Producto"
                                defaultValue=""
                                onChange={(e) => props.onChangeTypeProduct(e.target.value)}
                                value={props.formData.idTipo}

                            >
                                {
                                    props.productTypeList.map(productType => (
                                        <MenuItem key={productType.idTipo} value={productType.idTipo}>{productType.descripcionTipo}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            name="diametroNominal"
                            label="Diametro Nominal"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={props.formData.diametroNominal}
                            onChange={props.handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="test-select-label">Descripcion de Producto</InputLabel>
                            <Select
                                labelId="test-select-label"
                                label="Descripcion de Producto"
                                defaultValue=""
                                onChange={(e) => props.onChangeProductDescription(e.target.value)}
                                value={props.formData.idDescripcion}
                            >
                                {
                                    props.productDescription.map(productDesc => (
                                        <MenuItem key={productDesc.idDescripcion} value={productDesc.idDescripcion}>{productDesc.nombreDescripcion}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            name="tolerancia"
                            label="Tolerancía"
                            type="text"
                            fullWidth
                            margin="normal"
                            value={props.formData.tolerancia}
                            onChange={props.handleInputChange}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mt: 4 }}>
                    Componentes
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="test-select-label">Prueba</InputLabel>
                            <Select
                                labelId="test-select-label"
                                label="Prueba"
                                defaultValue=""
                                onChange={(e) => props.onChangeComponentCategory(e.target.value)}

                            >
                                {
                                    props.supplieStorageList.map(supplie => (
                                        <MenuItem key={supplie.idDescripcion} value={`${supplie.idDescripcion}, 
                                        ${supplie.descripcion} , ${supplie.idFraccionamiento === undefined ? supplie.idAlmacenamiento : supplie.idFraccionamiento}`}>{supplie.descripcion}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="component-category-label">Categoría</InputLabel>
                            <Select
                                labelId="component-category-label"
                                label="Categoría"
                                value={props.componentId}
                                onChange={(e) => props.handleSetIdComponent(e.target.value as string)}
                            >
                                {
                                    props.suppliesListComputed.map(category => (
                                        <MenuItem key={category.idInsumo} value={category.idInsumo}>{category.nombre}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4} md={1} lg={1}>
                        <TextField
                            label="Cantidad"
                            type="number"
                            fullWidth
                            value={props.componentQuantity}
                            onChange={(e) => props.handleSetQuantity(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Typography variant="body2">
                            {props.componentCategory.idAlmacenamiento}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.handleAddComponent}
                            fullWidth
                        >
                            Agregar Componente
                        </Button>
                    </Grid>
                </Grid>

                {props.components.length > 0 && (
                    <List sx={{ mt: 2 }}>
                        {props.components.map((component) => (
                            <ListItem key={component.category} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                                <ListItemText
                                    primary={`${component.category} - Cantidad: ${component.quantity}`}
                                    secondary={component.type}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => props.handleRemoveComponent(component.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, mb: 10 }}
                    onClick={() => props.onSaveHandler()}
                >
                    Guardar Producto
                </Button>
            </form>
        </>
    );
}