import DataTable, {
  IDataTableProps,
  TableColumn,
  TableProps,
  TableRow,
  TableStyles,
} from "react-data-table-component";
import "./styles/dataTableStyle.css";
import { customDatatableStyle } from "./styles/custom-styles";
import TableFooter from "../TableFooter";
interface DataTable<T> extends IDataTableProps<T> {
  entityName: string;
}

const DataTableComponent = <T extends object>(
  props: DataTable<T>
): JSX.Element => {
  return (
    <div className="styledTableContainer">
      <DataTable
        paginationComponent={(paginationProps) => (
          <TableFooter
            {...paginationProps}
            entityName={props.entityName}
            style={{ marginTop: "10px" }}
          />
        )}
        {...props}
        customStyles={customDatatableStyle()}
        className="light-table"
      />
    </div>
  );
};

export default DataTableComponent;
export type { TableColumn, TableStyles, TableRow, TableProps, IDataTableProps };
