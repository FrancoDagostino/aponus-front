import DataTable, {
  TableColumn,
} from "../../../components/DataTable/DataTable";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IPostUpdateStock, IProducto } from "../model/stockList.model";

interface IProductListComponentProps {
  data: IProducto[];
  onOpenEditModalHandler: (newStock: IPostUpdateStock) => void;
}

const StockProductListTableComponent: React.FC<IProductListComponentProps> = (
  props
) => {
  const columns: Array<TableColumn<IProducto>> = [
    {
      name: "Diametro Nominal",
      cell: (row) => (
        <p style={{ fontSize: "15px", marginRight: "5px" }}>
          {row.diametroNominal}
        </p>
      ),
      selector: (row) => row.diametroNominal,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tolerancía",
      cell: (row) => (
        <p style={{ fontSize: "15px", marginRight: "5px" }}>{row.tolerancia}</p>
      ),
      selector: (row) => row.tolerancia,
      sortable: true,
      reorder: true,
    },
    {
      name: "Cantidad",
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "15px", marginRight: "5px" }}>{row.cantidad}</p>
          <EditRoundedIcon
            fontSize="small"
            onClick={() => onEditHandler(row, "Cantidad")}
          />
        </div>
      ),
      selector: (row) => row.cantidad,
      sortable: true,
      reorder: true,
    },
    {
      name: "Precio Lista",
      cell: (row) => (
        <p style={{ fontSize: "15px", marginRight: "5px" }}>
          {row.precioLista}
        </p>
      ),
      selector: (row) => row.precioLista,
      sortable: true,
      reorder: true,
    },
    {
      name: "Precio Final",
      cell: (row) => (
        <p style={{ fontSize: "15px", marginRight: "5px" }}>
          {row.precioFinal}
        </p>
      ),
    },
    {
      name: "Porcentaje Ganacía",
      cell: (row) => (
        <p style={{ fontSize: "15px", marginRight: "5px" }}>
          {row.porcentajeGanancia}
        </p>
      ),
    },
  ];

  const onEditHandler = (row: IProducto, columnName: string) => {
    const newStock: IPostUpdateStock = {
      destino: columnName,
      id: row.idProducto,
      operador: "=",
      valor: 0,
    };
    props.onOpenEditModalHandler(newStock);
  };

  return (
    <DataTable
      columns={columns}
      data={props.data}
      entityName="Listado de Productos"
      pagination
      paginationPerPage={5}
      paginationDefaultPage={1}
    />
  );
};

export default StockProductListTableComponent;
