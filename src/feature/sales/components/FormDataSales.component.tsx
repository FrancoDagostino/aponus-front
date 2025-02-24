import { ChangeEvent, FC, useRef, useState } from "react";
import { IProviderList } from "../../movementAdd/hooks/useModule.hook";
import { Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IFormData } from "../hooks/useSalesAdd.hook";
import { IBilling, IProduct, IQuatationList } from "../model/sales.model";
import { QuatationListComponent } from "./QuatationList.component";

interface ISupplyItem {
    id: string;
    name: string;
    quantity: string;
    mont: number
}
interface IFormDataPurchaseComponentProps {
    billingList: IBilling[]
    providerList: IProviderList[],
    availableSupplies: IProduct[],
    formData: IFormData
    quatationList: IQuatationList[]
    onChangePurchaseDateHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onChangeCheckboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onAddInputFilesHanlder: (files: File[]) => void
    onSaveHandler: () => void
    handleDeleteSupply: (id: string) => void
    onClickQuotationHandler: () => void
}

const paymentMethods = [
    { id: 1, name: 'Efectivo' },
    { id: 2, name: 'Tarjeta de crédito' },
    { id: 3, name: 'Transferencia bancaria' },
];

export const FormDataSalesComponent: FC<IFormDataPurchaseComponentProps> = (props) => {
    const [selectedSupply, setSelectedSupply] = useState<string>('')
    const [supplyQuantity, setSupplyQuantity] = useState<string>('')
    const [supplyList, setSupplyList] = useState<ISupplyItem[]>([])
    const [fileError, setFileError] = useState<string>('')
    const [productQuantity, setProductQuantity] = useState<number>(0)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddSupply = () => {
        const availableSupplyFound = props.availableSupplies.find(supply => supply.idProducto === selectedSupply)!
        const newSupply: ISupplyItem = {
            id: availableSupplyFound.idProducto,
            name: availableSupplyFound.nombre,
            quantity: supplyQuantity,
            mont: availableSupplyFound.precioFinal
        }

        const supplyFound = supplyList.find(supply => supply.id === newSupply.id)
        const supply = supplyFound !== undefined && supplyList.length ? supplyList.map(supply => {
            return supply.id === newSupply.id ? newSupply : supply
        }) : [...supplyList, newSupply]
        setSupplyList(supply)

        setSelectedSupply('')
        setSupplyQuantity('')
        setProductQuantity(0)
        props.onAddSupplyItemHandler(supply)
    }

    const onChangeProductQuantity = (e: string) => {
        setSelectedSupply(e)
        const selectedSupply = props.availableSupplies.find(supply => supply.idProducto === e)!
        setProductQuantity(selectedSupply.cantidad)
    }

    const handleDeleteSupply = (id: string) => {
        setSupplyList(prevList => prevList.filter(item => item.id !== id))
        props.handleDeleteSupply(id);
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileError('')
            const files = Array.from(event.target.files)

            props.onAddInputFilesHanlder(files)

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }
    const handleFileDelete = (fileToDelete: File) => {
        props.onRemoveFileHandler(fileToDelete)
    }


    return (
        <Box sx={{ my: 4, ml: 4, mr: 4, mt: 4 }}>
            <Typography variant="h4">Formulario De Venta</Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-provider-label">Cliente</InputLabel>
                        <Select
                            labelId="destination-provider-label"
                            id="idProvider"
                            name="idProvider"
                            value={props.formData.idProvider.toString()}
                            label="Destination Provider"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            <MenuItem value="0">Seleccionar Cliente</MenuItem>
                            {
                                props.providerList.map(provider => (
                                    <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-provider-label">Medio de Pago</InputLabel>
                        <Select
                            labelId="destination-provider-label"
                            id="idPaymentMethod"
                            name="idPaymentMethod"
                            value={props.formData.idPaymentMethod.toString()}
                            label="Medio de Pago"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            {
                                paymentMethods.map(method => (
                                    <MenuItem key={method.id} value={method.id}>{method.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: `${props.formData.idPaymentMethod === 1 ? 'none' : ''}` }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Entidad Bancaria</InputLabel>
                        <Select
                            name="idBilling"
                            value={props.formData.idBilling.toString()}
                            label="Entidad Bancaria"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            <MenuItem value="0">Seleccionar Entidad Bancaria</MenuItem>
                            {
                                props.billingList.map(billing => (
                                    <MenuItem key={billing.idEntidad} value={billing.idEntidad}>{billing.emisor} - {billing.descripcion}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: `${props.formData.idPaymentMethod === 1 ? 'none' : ''}` }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Cantidad de cuotas</InputLabel>
                        <Select
                            name="quantityCuote"
                            value={props.formData.quantityCuote.toString()}
                            label="Cantidad de cuotas"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            <MenuItem value="0">Seleccionar Cantidad de cuotas</MenuItem>
                            {
                                [1, 3, 6, 12, 24, 36].map(cuote => (
                                    <MenuItem key={cuote} value={cuote}>{cuote}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Interes"
                        variant="standard"
                        name="interest"
                        value={props.formData.interest}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                props.onChangePurchaseDateHandler(e);
                            }
                        }}
                        type="text"
                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Estado Venta</InputLabel>
                        <Select
                            name="idStateSales"
                            value={props.formData.idStateSales.toString()}
                            label="Estado Venta"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            <MenuItem value="1">En Proceso</MenuItem>
                            <MenuItem value="2">Finalizada</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Saldo Cancelado"
                        variant="standard"
                        name="mont"
                        value={props.formData.mont}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                                props.onChangePurchaseDateHandler(e);
                            }
                        }}
                        type="text"
                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Monto Total"
                        variant="standard"
                        name="totalMont"
                        value={props.formData.totalMont}
                        onChange={props.onChangePurchaseDateHandler}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        onClick={props.onClickQuotationHandler}
                    >
                        Cotizar
                    </Button>
                </Grid>

                <Box
                    sx={{
                        border: '1px dashed rgba(255, 255, 255, 0.23)',
                        borderRadius: '4px',
                        p: 2,
                        mb: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                            borderColor: 'rgba(255, 255, 255, 0.8)',
                        }
                    }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        accept=".jpg"
                        onChange={handleFileUpload}
                        multiple
                    />
                    <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body1">
                        Arrastre y suelte archivos PDF aquí o haga clic para seleccionar
                    </Typography>
                </Box>
                {fileError && (
                    <Typography color="error" variant="caption" display="block" sx={{ mb: 2 }}>
                        {fileError}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {props.formData.files.map((file, index) => (
                        <Chip
                            key={index}
                            label={file.name}
                            onDelete={() => handleFileDelete(file)}
                            icon={<AttachFileIcon />}
                        />
                    ))}
                </Box>
                <Grid item xs={12} md={12}>
                    <Typography variant="h5" gutterBottom>
                        Productos
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Productos</InputLabel>
                            <Select
                                value={selectedSupply}
                                label="Productos"
                                onChange={(e) => onChangeProductQuantity(e.target.value)}
                            >
                                {props.availableSupplies.map((supply) => (
                                    <MenuItem key={supply.idProducto} value={supply.idProducto}>
                                        {supply.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Cantidad"
                            type="number"
                            value={supplyQuantity}
                            onChange={(e) => setSupplyQuantity(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            onClick={handleAddSupply}
                            disabled={!selectedSupply || !supplyQuantity}
                            startIcon={<AddIcon />}
                            fullWidth
                            size='small'
                        >
                            Agregar
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Cantidad disponible: {productQuantity}
                    </Typography>
                    <List>
                        {supplyList.map((item) => (
                            <ListItem key={item.id} divider>
                                <ListItemText primary={item.name} secondary={`Cantidad: ${item.quantity}`} />
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSupply(item.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Grid item xs={12} md={12}>
                        {props.quatationList.length > 0 && (
                            <QuatationListComponent quatationList={props.quatationList} />
                        )}
                    </Grid>
                </Grid>
                <Grid item justifyContent={"flex-end"} xs={12} marginBottom={5}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={props.onSaveHandler}
                        disabled={supplyList.length === 0}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}