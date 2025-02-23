export interface IMenuItem {
    id: number;
    label: string;
    icon: string;
    tooltip: string
    path: string
    roles: string[]
}

const menuItem: IMenuItem[] = [
    { id: 11, label: "Home", icon: "Dashboard", path: "/dashboard", tooltip: "Home", roles: ["admin", "vendedor", "gestor_stock", "consultor_stock", "solo_lectura"] },
    { id: 2, label: "Gestion  Stock", icon: "Stock", path: "/stock-list", tooltip: "Gestion  de Stock", roles: ["admin", "gestor_stock", "vendedor"] },
    { id: 5, label: "Gestion  Productos", icon: "ProductList", path: "/product-list", tooltip: "Gestion  de Productos", roles: ["admin", "gestor_stock", "consultor_stock"] },
    { id: 6, label: "Gestion  Componentes", icon: "ComponentList", path: "/component-list", tooltip: "Gestion  de Componentes", roles: ["admin", "gestor_stock", "consultor_stock"] },
    { id: 7, label: "Gestion  Movimientos", icon: "MovementList", path: "/movements-list", tooltip: "Gestion  de Movimientos", roles: ["admin", "gestor_stock", "consultor_stock"] },
    { id: 9, label: "Gestion  Compras", icon: "PucharseList", path: "/pucharse-list", tooltip: "Gestion  de Compras", roles: ["admin", "vendedor"] },
    { id: 10, label: "Gestion  Ventas", icon: "SaleList", path: "/sales-list", tooltip: "Gestion  de Ventas", roles: ["admin", "vendedor"] },
    { id: 8, label: "Gestion  Entidades", icon: "EntityList", path: "/entity-list", tooltip: "Gestion  de Entidades", roles: ["admin", "vendedor"] },
    { id: 1, label: "Gestion  Categorias", icon: "Category", path: "/category-list", tooltip: "Categorias", roles: ["admin", "gestor_stock"] },
    { id: 3, label: "Registrar Usuario", icon: "AddUser", path: "/user", tooltip: "Registrar Usuario", roles: ["admin"] },
    { id: 4, label: "Salir", icon: "Power", path: "/asd", tooltip: "Salir", roles: ["admin", "vendedor", "gestor_stock", "consultor_stock", "solo_lectura"] },
]

export interface INavigationStore {
    menuItem: IMenuItem[]
}

export const useNavigationStore = (): INavigationStore => {

    return {
        menuItem: menuItem
    }
}