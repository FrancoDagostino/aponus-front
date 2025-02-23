import { FC } from "react";
import { IAuthStore } from "../authentication/store/useAuth.store";
import { INavigationStore } from "./store/useNavigation.store";
import ShowListIcon from '@mui/icons-material/PlaylistPlayRounded';
import { ItemMenuComponent } from "./components/itemMenu/itemMenu.component";
import './index.css'
import { useModuleHook } from "./hooks/useNavigation.hook";

interface IMenuWrappersProps {
    navigationStore: INavigationStore;
    authStore: IAuthStore;
}

//TODO: cambiar el status
const Menu: FC<IMenuWrappersProps> = (props) => {
    console.log("props.authStore.rol", props.authStore.rol)
    const moduleHook = useModuleHook()
    return (
        <>
            {props.authStore.status === "is authenticated" ? (
                <div className="navigation-content">
                    <div className="navigation-option-list">
                        <ShowListIcon className="navigation-icon-list" fontSize="large" />
                    </div>
                    {
                        props.navigationStore.menuItem.map(item => (
                            <ItemMenuComponent userRole={props.authStore.rol} item={item} onLogoutHandler={props.authStore.logOutAction} onNavigate={moduleHook.onClickMenuItemHandler} key={item.id} />
                        ))
                    }
                </div>
            ) : null}
        </>
    )
}

export default Menu