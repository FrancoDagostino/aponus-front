
import { UiModule } from "./feature/ui/module"
import { Router } from "./Router"
import { AppTheme } from "./theme/AppTheme"
import { useStore } from "./useStore"


function App() {
    const stores = useStore()

    return (
        <AppTheme>
            <UiModule uiStore={stores.uiHook} />
            <Router stores={stores} />
        </AppTheme>
    )
}

export default App