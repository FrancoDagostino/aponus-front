
import { Edit } from "@mui/icons-material";
import { Producto } from "../model/product.model";
import ExpandableTableRowComponent from "./ExpandableTableRow.component";
import ReactDataTableComponent, { PaginationOptions, TableColumn, TableStyles } from 'react-data-table-component';
import { IconButton } from "@mui/material";

interface IProductListComponentProps {
  data: Producto[];
  onEditProductHandler: (idProduct: string) => void

}

const ProductListTableComponent: React.FC<IProductListComponentProps> = (props) => {

  const columns: Array<TableColumn<Producto>> = [
    {
      name: "Diametro Nominal",
      cell: (row) => <p>{row.diametroNominal}</p>,
      selector: (row) => row.diametroNominal,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tolerancía",
      cell: (row) => <p>{row.tolerancia}</p>,
      selector: (row) => row.tolerancia,
      sortable: true,
      reorder: true,
    },
    {
      name: "Acciones",
      cell: (row) => <IconButton onClick={() => props.onEditProductHandler(row.idProducto)}><Edit ></Edit></IconButton>,
    },
  ];


  const customStyles: TableStyles = {
    headRow: {
      style: {
        backgroundColor: "white",
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '0px',
        color: "black"
      },
    },
    rows: {
      style: {
        backgroundColor: "GrayText",
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: "black"
      },

    },

    pagination: {
      style: {
        fontSize: '13px',
        minHeight: '56px',
        backgroundColor: 'none',
        borderTopWidth: '1px',
        borderTopColor: 'none',
        fontFamily: 'Arial',
        borderTop: 'none',
        color: "GrayText"
      }
    }
  };

  const paginationComponentOptions: PaginationOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  };

  return (
    <ReactDataTableComponent
      columns={columns}
      data={props.data}
      expandableRows
      paginationComponentOptions={paginationComponentOptions}
      expandableRowsComponent={ExpandableTableRowComponent}
      pagination
      paginationPerPage={5}
      customStyles={customStyles}
      paginationDefaultPage={1}
    />
  );
};

export default ProductListTableComponent;
