import { FC } from "react"
import { IRow, IRowContainer } from "../model/component.model"
import { ICell } from "../../entityAdd/model/entityAdd.model"
import { PaginationOptions, TableColumn, TableStyles } from "react-data-table-component"
import ReactDataTableComponent from 'react-data-table-component';



interface IComponentListTableProps {
    data: IRowContainer
}

const getColumns = (rows: IRow[]) => {

    const resultRows = rows.map((data) => [...data.cellList])

    const resultColumn = resultRows.length
        ? resultRows[0].map((cell, index) => ({
            name: cell.header,
            width: "130px",
            selector: (cellParam: ICell[]) => cellParam[index].value,
            cell: (cells: ICell[], rowIndex: number) => {
                const currentRow = rows[rowIndex]
                if (cells.length === 0) return []
                if (currentRow === undefined) return []
                return cells[index]?.value ?? "0"
            },
            sortable: true
        }))
        : []

    return resultColumn
}

export const ComponentListTable: FC<IComponentListTableProps> = (props) => {

    const getRows = (dataList: IRowContainer): ICell[][] => dataList.rowList.map((data) => [...data.cellList])
    const rows = getRows(props.data)

    const columns: TableColumn<ICell[]>[] = getColumns(props.data.rowList)

    const customStyles: TableStyles = {

        headRow: {
            style: {
                backgroundColor: "#EDEEEF",
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '0px',
                color: "#000000",
            },
        },
        rows: {
            style: {
                backgroundColor: "#EDEEEF",
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                color: "#000000",
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
                color: "#000000",
                justifyContent: 'flex-start'

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
            data={rows}
            columns={columns}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            paginationPerPage={7}
            paginationRowsPerPageOptions={[7, 10, 13]}
            customStyles={customStyles}
            striped
        />
    )
}