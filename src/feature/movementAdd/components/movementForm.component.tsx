import { useState, useRef, ChangeEvent, FC, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography, IconButton, TextField, List, ListItem, ListItemText, Chip, SelectChangeEvent, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { ISuppliesList } from '../model/movement.model';
import { IFormData, IProviderList, ISupplyItem } from '../hooks/useModule.hook';


interface SupplyItem {
    id: string;
    name: string;
    quantity: string;
}

interface IProcessQuantities {
    recibido: number;
    pintura: number;
    proceso: number;
    moldeado: number;
    pendiente: number;
}
interface IMovementFormProps {
    availableSupplies: ISuppliesList[]
    formData: IFormData
    providerList: IProviderList[]
    onAddInputFilesHanlder: (files: File[]) => void
    onRemoveFileHandler: (fileToDelete: File) => void
    onChangeFormDataHandler: (event: SelectChangeEvent<string>) => void
    onAddSupplyItemHandler: (supplyItem: ISupplyItem[]) => void
    onSaveHandler: () => void
}

export const MovementFormComponent: FC<IMovementFormProps> = (props) => {

    const [fileError, setFileError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedSupply, setSelectedSupply] = useState<string>('')
    const [supplyQuantity, setSupplyQuantity] = useState<string>('')
    const [supplyList, setSupplyList] = useState<ISupplyItem[]>([])
    const [processQuantities, setProcessQuantities] = useState<IProcessQuantities>({
        recibido: 0,
        pintura: 0,
        proceso: 0,
        moldeado: 0,
        pendiente: 0
    })
    useEffect(() => {
        setSupplyList(props.formData.supplyItem)
    }, [])


    const onChangeComponentQuantities = (e: string) => {
        setSelectedSupply(e)
        const selectedSupply = props.availableSupplies.find(supply => supply.idInsumo === e)!
        setProcessQuantities({
            recibido: selectedSupply.granallado,
            pintura: selectedSupply.pintura,
            proceso: selectedSupply.proceso,
            moldeado: selectedSupply.moldeado,
            pendiente: selectedSupply.pendiente
        })
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

    const handleAddSupply = () => {
        const availableSupplyFound = props.availableSupplies.find(supply => supply.idInsumo === selectedSupply)!

        const newSupply: SupplyItem = {
            id: availableSupplyFound.idInsumo,
            name: availableSupplyFound.nombre,
            quantity: supplyQuantity
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

    const onSaveHandler = () => {
        props.onSaveHandler()
    }

    // Example data for process quantities


    return (
        <Box sx={{ my: 4, ml: 4, mr: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Informacion del Proveedor
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-provider-label">Proveedor Destino</InputLabel>
                        <Select
                            labelId="destination-provider-label"
                            id="idProvider"
                            name="idProvider"
                            value={props.formData.idProvider.toString()}
                            label="Destination Provider"
                            onChange={props.onChangeFormDataHandler}
                        >
                            <MenuItem value="0">Seleccionar Proveedor</MenuItem>
                            {
                                props.providerList.map(provider => (
                                    <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="source-process-label">Proceso Origen</InputLabel>
                        <Select
                            labelId="source-process-label"
                            id="source-process"
                            name="sourceProcess"
                            value={props.formData.sourceProcess}
                            label="Source Process"
                            onChange={props.onChangeFormDataHandler}
                        >
                            <MenuItem value="recibido">Recibido</MenuItem>
                            <MenuItem value="pintura">Pintura</MenuItem>
                            <MenuItem value="granallado">Granallado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-process-label">Proceso Destino</InputLabel>
                        <Select
                            labelId="destination-process-label"
                            id="destination-process"
                            name="destinationProcess"
                            value={props.formData.destinationProcess}
                            label="Destination Process"
                            onChange={props.onChangeFormDataHandler}
                        >
                            <MenuItem value="recibido">Recibido</MenuItem>
                            <MenuItem value="pintura">Pintura</MenuItem>
                            <MenuItem value="granallado">Granallado</MenuItem>
                            <MenuItem value="proceso">Proceso</MenuItem>
                            <MenuItem value="moldeado">Moldeado</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography variant="subtitle1" gutterBottom>
                        Cantidades Disponibles
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Recibido: {processQuantities.recibido},
                        Pintura: {processQuantities.pintura},
                        Proceso: {processQuantities.proceso},
                        Moldeado: {processQuantities.moldeado},
                        Pendiente: {processQuantities.pendiente}
                    </Typography>

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
                            Arrastre y suelte archivos aquí o haga clic para seleccionar
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
                </Grid>

                <Grid item xs={12} md={6}>
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
                                onChange={(e) => onChangeComponentQuantities(e.target.value)}
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
                        onClick={() => onSaveHandler()}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}