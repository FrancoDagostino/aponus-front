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

interface ModalNewStockComponentProps {
    onCloseEditModalHandler: () => void;
    isOpen: boolean;
    onEditStockHandler: (valueNewStock: number) => void;
}

const ModalNewStockComponent: FC<ModalNewStockComponentProps> = (props) => {
    const [valueInput, setValueInput] = useState<string>("");

    const handleClose = () => {
        setValueInput("");
        props.onCloseEditModalHandler();
    };

    const handlerSave = () => {
        props.onEditStockHandler(Number(valueInput));
        setValueInput("");
    };

    return (
        <div>
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
                        Editar stock de:
                    </Typography>
                    <TextField
                        label="Editar Stock"
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
        </div>
    );
};

export default ModalNewStockComponent;
