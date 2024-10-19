export interface IMenuItem {
    id: number;
    label: string;
    icon: string;
    tooltip: string
    path: string
}

const menuItem: IMenuItem[] = [
    { id: 1, label: "Listado Categorias", icon: "Category", path: "/category-list", tooltip: "Categorias" },
    { id: 2, label: "Listado Stock", icon: "Stock", path: "/stock-list", tooltip: "Listado de Stock" },
    { id: 5, label: "Listado Productos", icon: "ProductList", path: "/product-list", tooltip: "Listado de Productos" },
    { id: 6, label: "Listado Componentes", icon: "ComponentList", path: "component-list", tooltip: "Listado de Componentes" },
    { id: 7, label: "Listado Movimientos", icon: "MovementList", path: "movements-list", tooltip: "Listado de Movimientos" },
    { id: 8, label: "Listado Entidades", icon: "EntityList", path: "entity-list", tooltip: "Listado de Entidades" },
    { id: 3, label: "Registrar Usuario", icon: "AddUser", path: "/asd", tooltip: "Registrar Usuario" },
    { id: 4, label: "Salir", icon: "Power", path: "/asd", tooltip: "Salir" },
]

export interface INavigationStore {
    menuItem: IMenuItem[]
}

export const useNavigationStore = (): INavigationStore => {

    return {
        menuItem: menuItem
    }
}