export interface IMenuItem {
    id: number;
    label: string;
    icon: string;
    tooltip: string
    path: string
}

const menuItem: IMenuItem[] = [
    { id: 1, label: "Gestion  Categorias", icon: "Category", path: "/category-list", tooltip: "Categorias" },
    { id: 2, label: "Gestion  Stock", icon: "Stock", path: "/stock-list", tooltip: "Gestion  de Stock" },
    { id: 5, label: "Gestion  Productos", icon: "ProductList", path: "/product-list", tooltip: "Gestion  de Productos" },
    { id: 6, label: "Gestion  Componentes", icon: "ComponentList", path: "/component-list", tooltip: "Gestion  de Componentes" },
    { id: 7, label: "Gestion  Movimientos", icon: "MovementList", path: "/movements-list", tooltip: "Gestion  de Movimientos" },
    { id: 8, label: "Gestion  Entidades", icon: "EntityList", path: "/entity-list", tooltip: "Gestion  de Entidades" },
    { id: 9, label: "Gestion  Compras", icon: "PucharseList", path: "/pucharse-list", tooltip: "Gestion  de Compras" },
    { id: 10, label: "Gestion  Ventas", icon: "SaleList", path: "/sales-list", tooltip: "Gestion  de Ventas" },
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