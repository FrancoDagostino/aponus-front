import { FC } from "react";
import DataTableComponent, {
    TableColumn,
} from "../../../components/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { IEntity } from "../model/EntityList.model";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface IEntityListComponentProps {
    data: IEntity[];
    onViewEntityHandler: (row: IEntity) => void
}

export const EntityTableListComponent: FC<IEntityListComponentProps> = (props) => {

    const columnsCategoryComputed: Array<TableColumn<IEntity>> = [
        {
            name: "Razón Social",
            cell: (row) => <p>{row.nombreClave}</p>,
        },
        {
            name: "Nombre y Apellido",
            cell: (row) => <p>{`${row.nombre} - ${row.apellido}`}</p>,
        },
        {
            name: "Tipo",
            cell: (row) => <p>{row.idTipo}</p>,
        },
        {
            name: "Categoría",
            cell: (row) => <p>{row.idCategoria}</p>,
        },
        {
            name: "Contacto",
            cell: (row) => <p>{row.telefono1}</p>,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <IconButton aria-label="edit">
                        <EditIcon color={"primary"} />
                    </IconButton>
                    <IconButton aria-label="view">
                        <RemoveRedEyeIcon color={"primary"} onClick={() => props.onViewEntityHandler(row)} />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon color={"error"} />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <DataTableComponent
                columns={columnsCategoryComputed}
                data={props.data}
                entityName="Listado Categoría"
            />
        </>
    );
};
