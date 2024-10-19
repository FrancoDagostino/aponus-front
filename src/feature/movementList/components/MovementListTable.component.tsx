import { FC, useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import './dataGrid.css'
import { Tooltip, IconButton, TablePagination } from "@mui/material";
import { IMovementListView } from "../hooks/useModule.hook";

interface IActivityDataGridComponentProps {
    activityList: IMovementListView[]
    searchValue: string
    // handleOpen: (row: any, isDisabled: boolean) => void
}
const Chip = ({ status }: { status: string }) => {
    return <span className={`chip ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
}

export const MovementListableComponent: FC<IActivityDataGridComponentProps> = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = props.activityList.length

    useEffect(() => {
        setPage(0)
    }, [props.searchValue])


    const startIndex = (page) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = props.activityList.slice(startIndex, endIndex)

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        event?.preventDefault()
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleView = (row: any) => {
        // props.handleOpen(row, true)
    }

    const handleEdit = (row: any) => {
        // props.handleOpen(row, false)
    }

    const handleDelete = (id: number) => {
        console.log(`Eliminar tarea con ID: ${id}`)
    }
    const columns = [
        {
            label: "Fecha",
            key: "date",
            style: ""
        },
        {
            label: "Proveedor",
            key: "provider",
            style: "hide-mobile"
        },
        {
            label: "Tipo",
            key: "type",
            style: "hide-tablet"
        },
        {
            label: "Usuario Creacion",
            key: "userCreation",
            style: "hide-mobile hide-tablet"
        },
        {
            label: "Usuario Modificacion",
            key: "userMod",
            style: "hide-mobile hide-tablet"
        },
        {
            label: "Estado",
            key: "status",
            style: "",
        },
        {
            label: "Acciones",
            key: "Acciones",
            style: ""
        },
    ]
    return (
        <>
            <div className="table-container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>

                                {
                                    columns.map(col => (
                                        <th className={col.style} style={{ width: col.key === "description" ? "4000px" : "" }} key={col.key}>{col.label}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row: any) => (
                                <tr key={row.id}>
                                    <>
                                        {
                                            columns.map(col => (
                                                col.key !== "Acciones"
                                                    ? (
                                                        <td className={col.style} style={{ width: col.key === "Descripcion" ? "4000px" : "" }}
                                                            key={col.key}>

                                                            {
                                                                col.key === "status"
                                                                    ? <Chip status={row[col.key]} />
                                                                    : (row as any)[col.key]
                                                            }

                                                        </td>)
                                                    : (
                                                        <td key={col.key}>
                                                            <div className="action-buttons">
                                                                <Tooltip title="Ver" onClick={() => handleView(row)}>
                                                                    <IconButton color="primary">
                                                                        <VisibilityIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Editar">
                                                                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="Eliminar" onClick={() => handleDelete(row.id)}>
                                                                    <IconButton color="error">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        </td>
                                                    )
                                            ))

                                        }
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mobile-cards">
                    {currentData.map((item: any) => (
                        <div key={item.id} className="card">
                            <p className="card-meta">{item.dateActivity} - {item.orden}</p>
                            <p>{item.description}</p>
                            <p>Responsable: {item.responsible}</p>
                            <div className="card-status">
                                <Chip status={item.status} />
                            </div>
                            <div className="card-actions">
                                <Tooltip title="Ver">
                                    <IconButton aria-label="ver" color="primary">
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton aria-label="editar" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton aria-label="eliminar" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <TablePagination
                        component="div"
                        labelRowsPerPage={"Cantidad de filas por página"}
                        count={totalPages}
                        rowsPerPageOptions={[10, 25, 50]}
                        size={"small"}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}

                    />
                </div>
            </div>
        </>
    )
}