import { Button, Modal, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FC, useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ModalComponentDescriptionComponentProps {
    onClose: () => void;
    isOpen: boolean;
    onAddOrUpdateComponent: (component: string, storage: string, fraction: string) => void;
    modalLabel: string;
}

const ModalComponentDescriptionComponent: FC<ModalComponentDescriptionComponentProps> = (props) => {
    const [valueInput, setValueInput] = useState<string>("");
    const [storage, setStorage] = useState<string>("UD");
    const [fraction, setFraction] = useState<string>("CM");
    const isEditing = props.modalLabel.includes('Edicion');
    const handleClose = () => {
        setValueInput("");
        props.onClose();
    };

    const handlerSave = () => {
        props.onAddOrUpdateComponent(valueInput, storage, fraction);
        setValueInput("");
    };

    return (
        <>
            <Modal
                open={props.isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        marginBottom={3}
                        sx={{ textAlign: "center" }}
                    >
                        {props.modalLabel}
                    </Typography>
                    <TextField
                        label={props.modalLabel}
                        variant="outlined"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    {!isEditing && (
                        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel>Almacenamiento</InputLabel>
                                <Select
                                    value={storage}
                                    label="Almacenamiento"
                                    onChange={(e) => setStorage(e.target.value)}
                                >
                                    <MenuItem value="UD">Unidad</MenuItem>
                                    <MenuItem value="KG">Kilogramo</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Fraccionamiento</InputLabel>
                                <Select
                                    value={fraction}
                                    label="Fraccionamiento"
                                    onChange={(e) => setFraction(e.target.value)}
                                >
                                    <MenuItem value="CM">Centimetro</MenuItem>
                                    <MenuItem value="UD">Unidad</MenuItem>
                                    <MenuItem value="">Sin Fraccionamiento</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    <Button
                        sx={{ marginTop: "15px" }}
                        variant="contained"
                        disabled={!valueInput}
                        onClick={handlerSave}
                        fullWidth
                    >
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponentDescriptionComponent;
