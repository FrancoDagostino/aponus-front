import { ChangeEvent, FC, useRef, useState } from "react";
import { IProviderList, ISupplyItem } from "../../movementAdd/hooks/useModule.hook";
import { ISuppliesList } from "../../movementAdd/model/movement.model";
import { IFormData } from "../hooks/usePurchaseAdd.hook";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface SupplyItem {
    id: string;
    name: string;
    quantity: string;
    mont: number
}
interface IFormDataPurchaseComponentProps {
    providerList: IProviderList[],
    availableSupplies: ISuppliesList[],
    formData: IFormData
    onChangePurchaseDateHandler: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onChangeCheckboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onAddInputFilesHanlder: (files: File[]) => void
    onSaveHandler: () => void
}

const paymentMethods = [
    { id: 1, name: 'Efectivo' },
    { id: 2, name: 'Tarjeta de crédito' },
    { id: 3, name: 'Transferencia bancaria' },
];

export const FormDataPurchaseComponent: FC<IFormDataPurchaseComponentProps> = (props) => {
    const [selectedSupply, setSelectedSupply] = useState<string>('')
    const [supplyQuantity, setSupplyQuantity] = useState<string>('')
    const [supplyList, setSupplyList] = useState<ISupplyItem[]>([])
    const [fileError, setFileError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddSupply = () => {
        const availableSupplyFound = props.availableSupplies.find(supply => supply.idInsumo === selectedSupply)!

        const newSupply: SupplyItem = {
            id: availableSupplyFound.idInsumo,
            name: availableSupplyFound.nombre,
            quantity: supplyQuantity,
            mont: 0
        }

        const supplyFound = supplyList.find(supply => supply.id === newSupply.id)
        const supply = supplyFound !== undefined && supplyList.length ? supplyList.map(supply => {
            return supply.id === newSupply.id ? newSupply : supply
        }) : [...supplyList, newSupply]
        setSupplyList(supply)

        setSelectedSupply('')
        setSupplyQuantity('')

        props.onAddSupplyItemHandler(supply)
    }

    const handleDeleteSupply = (id: string) => {
        setSupplyList(prevList => prevList.filter(item => item.id !== id))
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
            <Typography variant="h4">Formulario De Compra</Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-provider-label">Proveedor</InputLabel>
                        <Select
                            labelId="destination-provider-label"
                            id="idProvider"
                            name="idProvider"
                            value={props.formData.idProvider.toString()}
                            label="Destination Provider"
                            onChange={props.onChangePurchaseDateHandler}
                        >
                            <MenuItem value="0">Seleccionar Proveedor</MenuItem>
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
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Saldo Cancelado"
                        variant="standard"
                        name="mont"
                        value={props.formData.mont}
                        onChange={props.onChangePurchaseDateHandler}
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
                    />


                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.formData.ready}
                                onChange={props.onChangeCheckboxHandler}
                                name="ready"
                                color="primary"
                            />
                        }
                        label="Mercadería recibida"
                    />
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
                        Componentes
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="supply-label">Componente</InputLabel>
                            <Select
                                labelId="supply-label"
                                value={selectedSupply}
                                label="Componentes"
                                onChange={(e) => setSelectedSupply(e.target.value)}
                            >
                                {props.availableSupplies.map((supply) => (
                                    <MenuItem key={supply.idInsumo} value={supply.idInsumo.toString()}>
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
                </Grid>
                <Grid item justifyContent={"flex-end"} xs={12}>
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