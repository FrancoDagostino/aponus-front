import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  IListadoCategorias,
  IListadoDescripciones,
} from "../../categoryList/model/category.model";

interface IProductCategorySelectsComponentProps {
  categoryList: IListadoCategorias[];
  descriptionList: IListadoDescripciones[];
  onSelectCategoryTypeHandler: (idTipo: string) => void;
  onSelectDescriptionTypeHandler: (
    idTipo: string,
    idDescription: string
  ) => void;
}



const ProductCategorySelectsComponent: React.FC<
  IProductCategorySelectsComponentProps
> = (props) => {

  const [productsType, setProductsType] = useState<string>("AB_PVC");
  const [productsDescription, setProductsDescription] = useState("");

  useEffect(() => {
    props.onSelectCategoryTypeHandler(productsType);
  }, [productsType]);

  const handleChangeTypeProduct = (event: SelectChangeEvent) => {
    setProductsType(event.target.value as string);
    setProductsDescription("");
  };

  const handleChangeProductDescription = (event: SelectChangeEvent) => {
    setProductsDescription(event.target.value as string);
    props.onSelectDescriptionTypeHandler(
      productsType,
      event.target.value as string
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={6}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tipos Producto
            </InputLabel>
            <Select
              value={productsType}
              label="Tipos Producto"
              onChange={handleChangeTypeProduct}
              sx={{ fontFamily: "Rubik-SemiBold" }}
            >
              {props.categoryList.map((category) => (
                <MenuItem value={category.idTipo} key={category.idTipo}>
                  {category.descripcionTipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ fontFamily: "Rubik-Regular" }}>
              Descripción Producto
            </InputLabel>
            <Select
              value={productsDescription}
              label="Descripción Productoss"
              onChange={handleChangeProductDescription}
              disabled={productsType === "" ? true : false}
              color="secondary"
              sx={{ fontFamily: "Rubik-SemiBold" }}
            >
              {props.descriptionList?.length &&
                props.descriptionList.map((description) => (
                  <MenuItem
                    value={description.idDescripcion}
                    key={description.idDescripcion}
                  >
                    {description.nombreDescripcion}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductCategorySelectsComponent;
