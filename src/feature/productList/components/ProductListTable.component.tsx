import DataTable, {
  TableColumn,
} from "../../../components/DataTable/DataTable";
import { Producto } from "../model/product.model";
import ExpandableTableRowComponent from "./ExpandableTableRow.component";

interface IProductListComponentProps {
  data: Producto[];
}

const ProductListTableComponent: React.FC<IProductListComponentProps> = (
  props
) => {

  console.log(props)
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
  ];
  return (
    <DataTable
      columns={columns}
      data={props.data}
      entityName="Listado de Productos"
      expandableRows
      expandableRowsComponent={ExpandableTableRowComponent}
      pagination
      paginationPerPage={5}
      paginationDefaultPage={1}
    />
  );
};

export default ProductListTableComponent;
