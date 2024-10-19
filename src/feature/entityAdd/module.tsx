import { EntityAddFormComponent } from "./components/EntityAddForm.component"
import { useEntityAddHook } from "./hook/useModule.hook"




export const EntityAddModule = () => {

    const useModule = useEntityAddHook()

    return (

        <EntityAddFormComponent formData={useModule.formData} onChangeFormData={useModule.onChangeFormDataHandler} />
    )
}