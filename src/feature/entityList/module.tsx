import { FC } from "react";
import { IEntityListStore } from "./store/useEntityList.store";
import { EntityTableListComponent } from "./components/EntityListTable.component";
import { IUiHook } from "../ui/hooks/useUi.hook";
import { useEntityListHook } from "./hooks/useModule.hook";
import { EntityViewModalComponent } from "./components/EntityViewModal.component";
import { Button, Grid, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

interface IEntityListProps {
    entityListStore: IEntityListStore
    uiHook: IUiHook
    onNavigate: (url: string) => void;
}



export const EntityListModule: FC<IEntityListProps> = (props) => {
    const useModule = useEntityListHook(props)


    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <h1>Listado de Entidades</h1>
                <Button
                    sx={{ height: 50, width: 300, marginLeft: "20px", marginTop: "15px", gap: 1 }}
                    variant="contained"
                    onClick={() => props.onNavigate('/entity-add')}
                    startIcon={<AddCircleOutlinedIcon />}
                >
                    Nueva Entidad
                </Button>
            </Box>
            <Grid container alignItems="center" justifyContent="space-between" spacing={2} mb={2} mt={2}>
                <Grid item>
                    <Typography variant="h4">Listado de Entidades</Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => props.onNavigate("entity-add")}
                    >
                        Nueva Entidad
                    </Button>
                </Grid>
            </Grid>
            <EntityTableListComponent onEditEntityHandler={useModule.onEditEntityHandler} data={props.entityListStore.entityListState} onRemoveEntity={useModule.onRemoveEntityHandler} onViewEntityHandler={useModule.onViewEntityHandler} />
            <EntityViewModalComponent entity={useModule.entityState} isOpen={useModule.isOpen} handleClose={useModule.handleClose} />

        </>
    )
}