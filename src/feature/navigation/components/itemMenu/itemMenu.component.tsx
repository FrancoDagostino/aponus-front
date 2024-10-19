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

interface IItemMenu {
    item: IMenuItem
    onNavigate: (path: string) => void;
    onLogoutHandler: () => void;
}

export const ItemMenuComponent = (props: IItemMenu) => {
    const renderIcon = () => {
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
            default:
                break;
        }
    }
    return (
        <div className="item-menu-card">
            {renderIcon()}
            <label onClick={() => props.item.label === "Salir" ? props.onLogoutHandler() : props.onNavigate(props.item.path)} className="item-menu-label">{props.item.label}</label>
        </div>
    )
}