import { Grid, Typography, Button } from "@mui/material";
import { MovementListableComponent } from "./components/MovementListTable.component";
import { useMovementListHook } from "./hooks/useModule.hook";
import { IMovementListStore } from "./store/useMovementList.store";
import AddIcon from '@mui/icons-material/Add';

interface IMovementListProps {
    movementListStore: IMovementListStore;
    onNavigate: (url: string) => void;
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
            <MovementListableComponent activityList={useModule.movementListState} searchValue="" />
        </>

    )
}
