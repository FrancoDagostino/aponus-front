import { FC, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, TableCell, TableRow, TableBody, Table, TableContainer, Typography, TableHead, Paper, styled, Stack } from '@mui/material';
import { CloudUpload, Download, ExpandMoreOutlined } from '@mui/icons-material';
import { ISale } from '../model/salesList.model';
import { SalesDetailSupplyComponent } from './SaleDetailSupply.component';
import { SaleDetailComponent } from './SaleDetail.component';
import DeleteIcon from '@mui/icons-material/Delete';


interface ISalesViewModalComponentProps {
    sales: ISale
    isOpen: boolean
    handleClose: () => void
    onDeleteFileHandler: (idVenta: string, hashArchivo: string) => void
    onSaveFileHandler: (idVenta: string, file: File) => void
    onPayHandler: (idVenta: string, numeroCuota: number) => void
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`


const FileNameText = styled(Typography)`
  color: #666;
  margin-left: ${({ theme }) => theme.spacing(2)};
`




export const SalesViewModalComponent: FC<ISalesViewModalComponentProps> = (props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleSave = () => {
        props.onSaveFileHandler(props.sales.idVenta.toString(), selectedFile!)
    }


    const handleDownload = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename); // Nombre del archivo que se descargará
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: { borderRadius: 15, padding: '20px' }
                }}
            >
                <DialogTitle>
                    <Typography fontSize={50} gutterBottom align="center" color="primary">
                        Información Detallada
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel1a-content' id='panel1a-header'>
                            <Typography>Listado de Productos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SalesDetailSupplyComponent details={props.sales.detallesVenta} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel2a-content' id='panel2a-header'>
                            <Typography>Listado de Cuotas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SaleDetailComponent idVenta={props.sales.idVenta.toString()} paymentList={props.sales.cuotas} onPayHandler={props.onPayHandler} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='panel3a-content' id='panel3a-header'>
                            <Typography>Listado de archivos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>

                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUpload />}
                                    sx={{
                                        bgcolor: "#C4A484",
                                        "&:hover": { bgcolor: "#B08968" },
                                    }}
                                >
                                    SELECCIONAR ARCHIVO
                                    <VisuallyHiddenInput type="file" onChange={handleFileSelect} />
                                </Button>

                                <FileNameText>{selectedFile ? selectedFile.name : "Ningún archivo seleccionado..."}</FileNameText>

                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    sx={{
                                        bgcolor: "#14345C",
                                        "&:hover": { bgcolor: "#0A1929" },
                                        ml: "auto",
                                    }}
                                    disabled={selectedFile === null}
                                >
                                    GUARDAR
                                </Button>

                            </Stack>
                            <TableContainer component={Paper} sx={{ maxWidth: "auto" }}>
                                <Table aria-label="tabla de detalles">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.sales.infoArchivos.map((archivo) => (
                                            <TableRow key={archivo.idArchivo}>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    {archivo.hashArchivo}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }}>
                                                    <Tooltip title="Descargar">
                                                        <IconButton color="primary" onClick={() => handleDownload(archivo.pathArchivo, archivo.hashArchivo)}>
                                                            <Download />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Eliminar">
                                                        <IconButton color="error" onClick={() => props.onDeleteFileHandler(props.sales.idVenta.toString(), archivo.hashArchivo)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.handleClose}
                        color="secondary"
                        variant="contained"
                        style={{ borderRadius: 20, padding: '10px 20px' }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}