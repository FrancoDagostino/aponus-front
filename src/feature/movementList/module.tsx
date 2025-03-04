import { Grid, Typography, Button } from "@mui/material";
import { MovementListableComponent } from "./components/MovementListTable.component";
import { useMovementListHook } from "./hooks/useModule.hook";
import { IMovementListStore } from "./store/useMovementList.store";
import AddIcon from '@mui/icons-material/Add';
import { MovementViewModalComponent } from "./components/MovementViewModal.componen";
import { IUiHook } from "../ui/hooks/useUi.hook";

interface IMovementListProps {
    movementListStore: IMovementListStore;
    permissions: string[]
    rol: string
    onNavigate: (url: string) => void;
    uiStore: IUiHook
}

export const MovementListModule = (props: IMovementListProps) => {



    const useModule = useMovementListHook(props)

    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2} mb={2} mt={2}>
                <Grid item>
                    <Typography variant="h4">Listado de Movimientos</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => props.onNavigate("movements-add")}
                    >
                        Nuevo Movimiento
                    </Button>
                </Grid>
            </Grid>
            <MovementListableComponent
                onEditMovementHandler={useModule.onEditMovementHandler}
                onViewMovementHandler={useModule.onViewMovementHandler}
                movementList={props.movementListStore.movementList}
                searchValue=""
            />
            <MovementViewModalComponent
                movement={useModule.movementViewState}
                isOpen={useModule.openModalView}
                handleClose={useModule.onCloseModalView}
                onNewFileMovementHandler={useModule.onNewFileMovementHandler}
                onDeleteFileHandler={useModule.onDeleteFileHandler}
            />
        </>

    )
}
