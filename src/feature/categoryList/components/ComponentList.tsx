import { FC } from "react";
import { IComponentDescription } from "../model/category.model";
import DataTableComponent, {
    TableColumn,
} from "../../../components/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface ICategoryListComponentProps {
    data: IComponentDescription[];
    onOpenModal: (labelModal: string, idCategory: string) => void;
    onDelete: (idType: string) => void;
}

const ComponentList: FC<ICategoryListComponentProps> = (props) => {

    const onEditCategoryHandler = (row: IComponentDescription) => {
        props.onOpenModal(`Edición del componente ${row.nombreDescripcion}`, row.idDescripcion);
    }

    const columnsCategoryComputed: Array<TableColumn<IComponentDescription>> = [
        {
            name: "Listado Componentes",
            cell: (row) => <p>{row.nombreDescripcion}</p>,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <IconButton aria-label="edit" onClick={() => onEditCategoryHandler(row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => props.onDelete(row.idAlmacenamiento)}>
                        <DeleteIcon />
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
                entityName="Listado Componentes"
                pagination
            />
        </>
    );
};

export default ComponentList;
