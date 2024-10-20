import { useAuthenticationService } from "./feature/authentication/services/useAuthentication.service";
import { IAuthStore, useAuthStore } from "./feature/authentication/store/useAuth.store";
import { useCategoryService } from "./feature/categoryList/services/useCategory.service";
import { ICategoryStore, useCategoryStore } from "./feature/categoryList/store/useCategory.store";
import { useComponentAddService } from "./feature/componentAdd/services/useComponentAdd.service";
import { IComponentAddStore, useComponentAddStore } from "./feature/componentAdd/store/useComponentAdd.store";
import { useComponentListService } from "./feature/componentList/services/useComponentList.service";
import { IComponentListStore, useComponentListStore } from "./feature/componentList/store/useComponentList.store";
import { useMovementListService } from "./feature/movementList/service/useMovementList.service";
import { IMovementListStore, useMovementListStore } from "./feature/movementList/store/useMovementList.store";
import { INavigationStore, useNavigationStore } from "./feature/navigation/store/useNavigation.store";
import { useProductListService } from "./feature/productList/services/useProductList.service";
import { IProductListStore, useProductListStore } from "./feature/productList/store/useProductList.store";
import { useDbStockListService } from "./feature/stockList/services/useDbStockList.service";
import useStockStore, { IStockStore } from "./feature/stockList/store/useStock.store";
import { useRestClient } from "./utils/clients/useRest.client";
import { IMovementAddStore, useMovementAddStore } from './feature/movementAdd/store/useMovementAdd.store';
import { useMovementAddService } from "./feature/movementAdd/service/useMovementAdd.service";
import { IUiHook, useUiHook } from "./feature/ui/hooks/useUi.hook";
import { IEntityListStore, useEntityListStore } from "./feature/entityList/store/useEntityList.store";
import { useEntityListService } from "./feature/entityList/service/useEntityList.service";
import { IEntityAddStore, useEntityAddStore } from "./feature/entityAdd/store/useEntityAdd.store";
import { useEntityAddService } from "./feature/entityAdd/service/useEntityAdd.service";


export interface IStores {
    authStore: IAuthStore
    navigationStore: INavigationStore
    stockStore: IStockStore
    categoryStore: ICategoryStore
    productListStore: IProductListStore
    componentListStore: IComponentListStore
    componentAddStore: IComponentAddStore
    movementListStore: IMovementListStore
    movementAddStore: IMovementAddStore
    entityListStore: IEntityListStore
    entityAddStore: IEntityAddStore
    uiHook: IUiHook
}

export const useStore = (): IStores => {

    const authStore = useAuthStore({
        useAuthService: useAuthenticationService({
            restClient: useRestClient()
        })
    });

    const stockStore = useStockStore({
        useDbStockListService: useDbStockListService({
            restClient: useRestClient()
        })
    })

    const categoryStore = useCategoryStore({
        categoryService: useCategoryService({
            restClient: useRestClient()
        })
    })

    const productListStore = useProductListStore({
        productListService: useProductListService({
            restClient: useRestClient()
        })
    })

    const componentListStore = useComponentListStore({
        componentListService: useComponentListService({
            restClient: useRestClient()
        })
    })


    const componentAddStore = useComponentAddStore({
        componentAddService: useComponentAddService({
            restClient: useRestClient()
        })
    })

    const movementListStore = useMovementListStore({
        movementListService: useMovementListService({
            restClient: useRestClient()
        })
    })

    const movementAddStore = useMovementAddStore({
        movementAddService: useMovementAddService({
            restClient: useRestClient()
        })
    })

    const entityListStore = useEntityListStore({
        entityListService: useEntityListService({
            restClient: useRestClient()
        })
    })


    const entityAddStore = useEntityAddStore({
        entityAddService: useEntityAddService({
            restClient: useRestClient()
        })
    })

    const uiHook = useUiHook()
    const navigationStore = useNavigationStore()

    return {
        authStore,
        navigationStore,
        stockStore,
        categoryStore,
        productListStore,
        componentListStore,
        movementListStore,
        componentAddStore,
        movementAddStore,
        entityListStore,
        entityAddStore,
        uiHook
    }
}