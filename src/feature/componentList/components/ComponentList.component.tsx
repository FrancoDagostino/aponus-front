import { FC } from "react"
import { TableColumn } from "../../../components/DataTable/DataTable"
import DataTable from "../../../components/DataTable/DataTable";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { IListadoComponentes } from "../model/component.model";



interface IComponentListProps {
    data: IListadoComponentes[]
}

const ComponentList: FC<IComponentListProps> = (props) => {
    function isKeyOfIEspecificaciones(key: any): key is keyof IListadoComponentes {
        return props.data.length > 0 && key in props.data[0];
    }

    const columns: Array<TableColumn<IListadoComponentes>> = [];

    // Definir una función para agregar columnas condicionalmente
    const addColumnIfDataExists = (
        propertyName: keyof IListadoComponentes,
        columnName: string
    ) => {
        if (props.data.some((item) => item[propertyName] != null)) {
            columns.push({
                name: columnName,
                cell: (row) =>
                    <p style={{ fontSize: "15px", marginRight: "5px" }}>
                        {row[propertyName]}
                    </p>,
                selector: (row) => row[propertyName],
                sortable: true,
                reorder: true,
            });
        }
    };

    // Lista de propiedades para verificar
    const propertiesToCheck: Array<keyof IListadoComponentes> = [
        "altura",
        "diametro",
        "diametroNominal",
        "espesor",
        "idAlmacenamiento",
        "idDescripcion",
        "idFraccionamiento",
        "idInsumo",
        "longitud",
        "longitud",
        "perfil",
        "peso",
        "tolerancia"
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
    columns.push({
        name: "Acciones",
        cell: () => <EditRoundedIcon />
    })

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

export default ComponentList