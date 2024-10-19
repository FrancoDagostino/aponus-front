import { FC, useEffect, useState } from "react";
import {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component/dist/DataTable/types";
import DataTableComponent from "../../../components/DataTable/DataTable";
import { useExpandableTableContext } from "../../../context/ExpandableTableProvider";
import { Box, Button, TextField } from "@mui/material";
import { IStockFormateado, Producto } from "../model/product.model";

const ExpandableTableRowComponent: FC<ExpanderComponentProps<Producto>> = (
  props
) => {
  const { handleSelectProductId, componentList } = useExpandableTableContext();
  const [quantity, setQuantity] = useState<string>("");
  useEffect(() => {
    handleCallComponentList(props.data.idProducto);
  }, [props.data.idProducto]);

  const handleCallComponentList = async (idProduct: string) => {
    await handleSelectProductId(idProduct, 1);
  };

  const columns: Array<TableColumn<IStockFormateado>> = [
    {
      name: "Granallado",
      cell: (row) => <p>{row.granallado}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Pintura",
      cell: (row) => <p>{row.pintura}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Moldeado",
      cell: (row) => <p>{row.moldeado}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Proceso",
      cell: (row) => <p>{row.proceso}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Recibido",
      cell: (row) => <p>{row.recibido}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Requerido",
      cell: (row) => <p>{row.requerido}</p>,
      sortable: true,
      reorder: true,
    },
    {
      name: "Total",
      cell: (row) => <p>{row.total}</p>,
      sortable: true,
      reorder: true,
    },
  ];

  const handlerSave = async () => {
    await handleSelectProductId(props.data.idProducto, Number(quantity));
    setQuantity("");
  };
  return (
    <>
      <DataTableComponent
        columns={columns}
        data={componentList}
        entityName="prueba"
      />
      <Box justifyContent="flex-end" display="flex" marginTop={4}>
        <TextField
          label="Editar Stock"
          variant="standard"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button
          sx={{ marginLeft: "20px", marginTop: "15px" }}
          variant="contained"
          onClick={handlerSave}
        >
          Guardar
        </Button>
      </Box>
    </>
  );
};

export default ExpandableTableRowComponent;
