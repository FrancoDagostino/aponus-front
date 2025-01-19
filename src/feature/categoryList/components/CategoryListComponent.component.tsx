import { FC } from "react";
import { IListadoCategorias } from "../model/category.model";
import DataTableComponent, {
  TableColumn,
} from "../../../components/DataTable/DataTable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandableDescriptionListComponentProps from "./ExpandableDescriptionList.component";
import { IconButton } from "@mui/material";

interface ICategoryListComponentProps {
  data: IListadoCategorias[];
  onOpenModal: (labelModal: string, idCategory: string) => void;
}

const CategoryListComponent: FC<ICategoryListComponentProps> = (props) => {


  const onEditCategoryHandler = (row: IListadoCategorias) => {
    props.onOpenModal(`Edición de la categoría ${row.descripcionTipo}`, row.idTipo);
  }

  const columnsCategoryComputed: Array<TableColumn<IListadoCategorias>> = [
    {
      name: "Listado Categorías",
      cell: (row) => <p>{row.descripcionTipo}</p>,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <IconButton aria-label="edit" onClick={() => onEditCategoryHandler(row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
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
        entityName="Listado Categoría"
        expandableRows
        expandableRowsComponent={ExpandableDescriptionListComponentProps}
        pagination
      />
    </>
  );
};

export default CategoryListComponent;
