import { FC } from "react";
import './index.css'
import Menu from './feature/navigation/index';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Header } from "./components/header/header";
import { IStores } from "./useStore";
import { AuthStack } from "./feature/authentication/stacks/auth.stacks";
import { StockListStack } from "./feature/stockList/stacks/stockList.stacks";
import { CategoryListStack } from "./feature/categoryList/stacks/categoryList.stacks";
import { ExpandableTableProvider } from "./context/ExpandableTableProvider";
import { ProductListStack } from "./feature/productList/stacks/productList.stacks";
import { ComponentListStack } from "./feature/componentList/stacks/componentList.stacks";
import { ComponentAddStack } from "./feature/componentAdd/stacks/componentAdd.stacks";
import { MovementListStack } from "./feature/movementList/stacks/movementList.stacks";
import { MovementAddtStack } from "./feature/movementAdd/stacks/movementAdd.stacks";
import { EntityListStack } from "./feature/entityList/stacks/entityList.stacks";
import { EntityAddStack } from "./feature/entityAdd/stack/EntityAdd.stacks";
import { ProductAddStack } from "./feature/productadd/stacks/productAdd.stacks";
import { PucharseListStack } from "./feature/purchaseList/stacks/pucharseList.stacks";
import { PucharseAddStack } from "./feature/purchaseAdd/stacks/purchaseAdd.stacks";
import { SalesAddStack } from "./feature/sales/stacks/salesAdd.stacks";
import { SaleListStack } from "./feature/salesList/stacks/salesList.stacks";
import { AuditoriaStack } from "./feature/auditoria/stacks/auditoria.stack";
import { UserStack } from "./feature/users/stacks/user.stacks";
import { DashboardStack } from "./feature/dashboard/stacks/dashboard.stacks";
interface IRouterProps {
    stores: IStores
}
export const Router: FC<IRouterProps> = ({
    stores: {
        authStore,
        categoryStore,
        navigationStore,
        productListStore,
        stockStore,
        componentListStore,
        componentAddStore,
        movementListStore,
        movementAddStore,
        entityListStore,
        entityAddStore,
        productAddStore,
        pucharseListStore,
        pucharseAddStore,
        salesAddStore,
        salesListStore,
        userStore,
        uiHook,
        auditoriaStore,
        dashboardStore

    },
}) => {
    const permissions = {
        stockList: ["admin", "gestor_stock", "consultor_stock"],
        categoryList: ["admin", "gestor_stock"],
        productList: ["admin", "gestor_stock", "consultor_stock"],
        productAdd: ["admin", "gestor_stock"],
        componentList: ["admin", "gestor_stock"],
        componentAdd: ["admin", "gestor_stock"],
        movementList: ["admin"],
        movementAdd: ["admin"],
        purchaseList: ["admin", "vendedor"],
        purchaseAdd: ["admin", "vendedor"],
        entityList: ["admin"],
        entityAdd: ["admin"]
    }
    return (
        <ExpandableTableProvider categoryStore={categoryStore} productListStore={productListStore} >
            <BrowserRouter basename={import.meta.env.BASE_URL} >
                {
                    authStore.status === "is not authenticated"
                        ? (
                            <Switch>
                                {
                                    AuthStack({ authStore, uiHook, isChangePassword: authStore.changePassword, username: authStore.username })
                                }
                            </Switch>
                        ) : (
                            <div className="appElement">
                                <Menu authStore={authStore} navigationStore={navigationStore} />
                                <Header />
                                <div className="contentElement">
                                    <Switch>
                                        {
                                            [
                                                StockListStack({ uiHook, permissions: permissions.stockList, rol: authStore.rol, stockStore, categoryStore }),
                                                CategoryListStack({ permissions: permissions.categoryList, rol: authStore.rol, categoryStore, uiHook }),
                                                ProductListStack({ uiHook, permissions: permissions.productList, rol: authStore.rol, categoryStore, productListStore }),
                                                ComponentListStack({ permissions: permissions.componentList, rol: authStore.rol, componentListStore, stockStore, uiHook }),
                                                ComponentAddStack({ uiHook, permissions: permissions.componentAdd, rol: authStore.rol, componentAddStore, stockStore }),
                                                MovementListStack({ permissions: permissions.movementList, rol: authStore.rol, movementListStore, uiStore: uiHook }),
                                                MovementAddtStack({ permissions: permissions.movementAdd, rol: authStore.rol, movementAddStore, uiHook }),
                                                EntityListStack({ permissions: permissions.entityList, rol: authStore.rol, entityListStore, uiHook }),
                                                EntityAddStack({ permissions: permissions.entityAdd, rol: authStore.rol, entityAddStore, uiHook }),
                                                ProductAddStack({ permissions: permissions.productAdd, rol: authStore.rol, productAddStore, uiHook }),
                                                PucharseListStack({ permissions: permissions.purchaseList, rol: authStore.rol, pucharseListStore, uiHook }),
                                                PucharseAddStack({ permissions: permissions.purchaseAdd, rol: authStore.rol, pucharseAddStore, uiHook, movementAddStore }),
                                                SalesAddStack({ permissions: permissions.productAdd, movementAddStore, rol: authStore.rol, salesAddStore, uiHook }),
                                                SaleListStack({ salesListStore, uiHook }),
                                                AuditoriaStack({ uiHook, auditoriaStore }),
                                                UserStack({ uiHook, userStore }),
                                                DashboardStack({ uiHook, dashboardStore })
                                            ]
                                        }
                                    </Switch>
                                </div>
                            </div>
                        )
                }

            </BrowserRouter>
        </ExpandableTableProvider>
    )
}