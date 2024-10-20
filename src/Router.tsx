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
        uiHook

    },
}) => {
    return (
        <ExpandableTableProvider categoryStore={categoryStore} productListStore={productListStore} >
            <BrowserRouter basename={import.meta.env.BASE_URL} >
                {
                    authStore.status === "is not authenticated"
                        ? (
                            <Switch>
                                {
                                    AuthStack({ authStore })
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
                                                StockListStack({ stockStore, categoryStore }),
                                                CategoryListStack({ categoryStore, uiHook }),
                                                ProductListStack({ categoryStore, productListStore }),
                                                ComponentListStack({ componentListStore, stockStore }),
                                                ComponentAddStack({ componentAddStore, stockStore }),
                                                MovementListStack({ movementListStore }),
                                                MovementAddtStack({ movementAddStore, uiHook }),
                                                EntityListStack({ entityListStore, uiHook }),
                                                EntityAddStack({ entityAddStore, uiHook })
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