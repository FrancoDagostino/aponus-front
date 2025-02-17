import { Button, Modal, Box, Typography, TextField } from "@mui/material";
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
    onAddOrUpdateComponent: (component: string) => void;
    modalLabel: string;
}

const ModalComponentDescriptionComponent: FC<ModalComponentDescriptionComponentProps> = (props) => {
    const [valueInput, setValueInput] = useState<string>("");

    const handleClose = () => {
        setValueInput("");
        props.onClose();
    };

    const handlerSave = () => {
        props.onAddOrUpdateComponent(valueInput);
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
                    />
                    <Button
                        sx={{ marginLeft: "20px", marginTop: "15px" }}
                        variant="contained"
                        disabled={!valueInput}
                        onClick={handlerSave}
                    >
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponentDescriptionComponent;
