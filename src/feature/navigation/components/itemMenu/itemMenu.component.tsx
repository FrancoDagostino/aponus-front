import "./itemMenu.css"
import AddUserIcon from "@mui/icons-material/PersonAdd"
import CategoryIcon from '@mui/icons-material/Category';
import PowerIcon from "@mui/icons-material/PowerSettingsNewRounded"
import { IMenuItem } from "../../store/useNavigation.store"
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppsIcon from '@mui/icons-material/Apps';
import WavesIcon from '@mui/icons-material/Waves';
import GroupIcon from '@mui/icons-material/Group';
import ShopIcon from '@mui/icons-material/Shop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

interface IItemMenu {
    item: IMenuItem
    onNavigate: (path: string) => void;
    onLogoutHandler: () => void;
    userRole: string;
}

export const ItemMenuComponent = (props: IItemMenu) => {
    const hasPermission = (): boolean => {
        // Verifica si el rol del usuario está incluido en los roles permitidos del ítem
        return props.item.roles.includes(props.userRole);
    }

    const renderIcon = () => {
        if (!hasPermission()) {
            return null; // No renderizar el ícono si no tiene permiso
        }

        switch (props.item.icon) {
            case 'Stock':
                return <InventoryIcon className="item-menu-icon" fontSize="large" />;
            case 'Category':
                return <CategoryIcon className="item-menu-icon" fontSize="large" />;
            case 'ProductList':
                return <ShoppingCartIcon className="item-menu-icon" fontSize="large" />;
            case 'Power':
                return <PowerIcon className="item-menu-icon" fontSize="large" />;
            case 'AddUser':
                return <AddUserIcon className="item-menu-icon" fontSize="large" />;
            case 'ComponentList':
                return <AppsIcon className="item-menu-icon" fontSize="large" />;
            case 'MovementList':
                return <WavesIcon className="item-menu-icon" fontSize="large" />;
            case 'EntityList':
                return <GroupIcon className="item-menu-icon" fontSize="large" />;
            case 'PucharseList':
                return <ShopIcon className="item-menu-icon" fontSize="large" />;
            case 'SaleList':
                return <AttachMoneyIcon className="item-menu-icon" fontSize="large" />;
            case 'Dashboard':
                return <HomeIcon className="item-menu-icon" fontSize="large" />;
            case 'Auditoria':
                return <ArticleIcon className="item-menu-icon" fontSize="large" />;
            default:
                return null;
        }
    }

    if (!hasPermission()) {
        return null; // No renderizar nada si no tiene permiso
    }

    return (
        <div className="item-menu-card" onClick={() => props.item.label === "Salir" ? props.onLogoutHandler() : props.onNavigate(props.item.path)} >
            {renderIcon()}
            <label className="item-menu-label">{props.item.label}</label>
        </div>
    )
}