import DataTable, {
  TableColumn,
} from "../../../components/DataTable/DataTable";
import { IEspecificaciones, IPostUpdateStock } from "../model/stockList.model";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
interface IProductListComponentProps {
  data: IEspecificaciones[];
  onOpenEditModalHandler: (newStock: IPostUpdateStock) => void;
}

const columnsEdit = [
  "Recibido",
  "Granallado",
  "Pintura",
  "Proceso",
  "Moldeado",
];

const StockListableComponent: React.FC<IProductListComponentProps> = (
  props
) => {
  function isKeyOfIEspecificaciones(key: any): key is keyof IEspecificaciones {
    return props.data.length > 0 && key in props.data[0];
  }

  const onEditHandler = (row: IEspecificaciones, columnName: string) => {
    const newStock: IPostUpdateStock = {
      destino: columnName,
      id: row.IdComponente,
      operador: "=",
      valor: 0,
    };
    props.onOpenEditModalHandler(newStock);
  };
  const columns: Array<TableColumn<IEspecificaciones>> = [];

  // Definir una función para agregar columnas condicionalmente
  const addColumnIfDataExists = (
    propertyName: keyof IEspecificaciones,
    columnName: string
  ) => {
    if (props.data.some((item) => item[propertyName] != null)) {
      columns.push({
        name: columnName,
        cell: (row) =>
          columnsEdit.includes(columnName) ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <p style={{ fontSize: "15px", marginRight: "5px" }}>
                {row[propertyName]}
              </p>
              <EditRoundedIcon
                onClick={() => onEditHandler(row, columnName)}
                fontSize="small"
              />
            </div>
          ) : (
            <p style={{ fontSize: "15px", marginRight: "5px" }}>
              {row[propertyName]}
            </p>
          ),
        selector: (row) => row[propertyName],
        sortable: true,
        reorder: true,
      });
    }
  };

  // Lista de propiedades para verificar
  const propertiesToCheck: Array<keyof IEspecificaciones> = [
    "pintura",
    "proceso",
    "recibido",
    "tolerancia",
    "granallado",
    "diametro",
    "Altura",
    "largo",
    "espesor",
    "moldeado",
    "diametroNominal"
  ];

  // Agregar columnas basadas en la existencia de sus datos
  propertiesToCheck.forEach((property) => {
    if (isKeyOfIEspecificaciones(property)) {
      addColumnIfDataExists(
        property,
        property.charAt(0).toUpperCase() + property.slice(1)
      );
    }
  });

  return (
    <DataTable
      columns={columns}
      data={props.data}
      entityName="Listado de Stock"
      pagination
      paginationPerPage={10}
      paginationDefaultPage={1}
    />
  );
};

export default StockListableComponent;
