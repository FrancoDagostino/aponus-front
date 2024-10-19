import { useState, useRef, ChangeEvent, FC } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography, IconButton, TextField, List, ListItem, ListItemText, Chip, SelectChangeEvent, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import AttachFileIcon from '@mui/icons-material/AttachFile'

interface Supply {
    id: number;
    name: string;
}

const availableSupplies: Supply[] = [
    { id: 1, name: 'Supply A' },
    { id: 2, name: 'Supply B' },
    { id: 3, name: 'Supply C' },
    { id: 4, name: 'Supply D' },
]

interface FormData {
    sourceProvider: string;
    destinationProvider: string;
    sourceProcess: string;
    destinationProcess: string;
    files: File[];
}

interface SupplyItem {
    id: number;
    name: string;
    quantity: string;
}

interface IMovementFormProps {

}

export const MovementFormComponent: FC<IMovementFormProps> = () => {
    const [formData, setFormData] = useState<FormData>({
        sourceProvider: '',
        destinationProvider: '',
        sourceProcess: '',
        destinationProcess: '',
        files: [],
    })
    const [fileError, setFileError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedSupply, setSelectedSupply] = useState<string>('')
    const [supplyQuantity, setSupplyQuantity] = useState<string>('')
    const [supplyList, setSupplyList] = useState<SupplyItem[]>([])

    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileError('')
            const files = Array.from(event.target.files)
            const validFiles = files.filter(file => file.type === 'application/pdf')
            const invalidFiles = files.filter(file => file.type !== 'application/pdf')

            if (invalidFiles.length > 0) {
                setFileError(`${invalidFiles.length} Solo estan permitidos archivos pdfs.`)
            }
            setFormData(prevData => ({
                ...prevData,
                files: [...prevData.files, ...validFiles]
            }))

            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleFileDelete = (fileToDelete: File) => {
        setFormData(prevData => ({
            ...prevData,
            files: prevData.files.filter(file => file !== fileToDelete)
        }))
    }

    const handleAddSupply = () => {
        const availableSupplyFound = availableSupplies.find(supply => supply.id === parseInt(selectedSupply))!

        const newSupply: SupplyItem = {
            id: availableSupplyFound.id,
            name: availableSupplyFound.name,
            quantity: supplyQuantity
        }

        const supplyFound = supplyList.find(supply => supply.id === newSupply.id)
        setSupplyList(supplyFound !== undefined && supplyList.length ? supplyList.map(supply => {
            return supply.id === newSupply.id ? newSupply : supply
        }) : [...supplyList, newSupply])

        setSelectedSupply('')
        setSupplyQuantity('')


    }

    const handleDeleteSupply = (id: number) => {
        setSupplyList(prevList => prevList.filter(item => item.id !== id))
    }

    return (
        <Box sx={{ my: 4, ml: 4, mr: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Informacion del Proveedor
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="source-provider-label">Source Provider</InputLabel>
                        <Select
                            labelId="source-provider-label"
                            id="source-provider"
                            name="sourceProvider"
                            value={formData.sourceProvider}
                            label="Source Provider"
                            onChange={handleChange}
                        >
                            <MenuItem value="provider1">Provider 1</MenuItem>
                            <MenuItem value="provider2">Provider 2</MenuItem>
                            <MenuItem value="provider3">Provider 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-provider-label">Destination Provider</InputLabel>
                        <Select
                            labelId="destination-provider-label"
                            id="destination-provider"
                            name="destinationProvider"
                            value={formData.destinationProvider}
                            label="Destination Provider"
                            onChange={handleChange}
                        >
                            <MenuItem value="provider1">Provider 1</MenuItem>
                            <MenuItem value="provider2">Provider 2</MenuItem>
                            <MenuItem value="provider3">Provider 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="source-process-label">Source Process</InputLabel>
                        <Select
                            labelId="source-process-label"
                            id="source-process"
                            name="sourceProcess"
                            value={formData.sourceProcess}
                            label="Source Process"
                            onChange={handleChange}
                        >
                            <MenuItem value="process1">Process 1</MenuItem>
                            <MenuItem value="process2">Process 2</MenuItem>
                            <MenuItem value="process3">Process 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="destination-process-label">Destination Process</InputLabel>
                        <Select
                            labelId="destination-process-label"
                            id="destination-process"
                            name="destinationProcess"
                            value={formData.destinationProcess}
                            label="Destination Process"
                            onChange={handleChange}
                        >
                            <MenuItem value="process1">Process 1</MenuItem>
                            <MenuItem value="process2">Process 2</MenuItem>
                            <MenuItem value="process3">Process 3</MenuItem>
                        </Select>
                    </FormControl>

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
                            accept=".pdf"
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
                        {formData.files.map((file, index) => (
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
                            <InputLabel id="supply-label">Supply</InputLabel>
                            <Select
                                labelId="supply-label"
                                value={selectedSupply}
                                label="Componentes"
                                onChange={(e) => setSelectedSupply(e.target.value)}
                            >
                                {availableSupplies.map((supply) => (
                                    <MenuItem key={supply.id} value={supply.id.toString()}>
                                        {supply.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Quantity"
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
                                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
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
                        onClick={handleAddSupply}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}