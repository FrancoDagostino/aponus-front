import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { IStockTypes } from "../model/stockList.model";
import { useEffect } from "react";

interface TabsCategoryComponentTypeProps {
  categoryTypeList: IStockTypes[];
  onChangeTabsHandler: (idDescription: string) => void;
}

const TabsCategoryComponentType: React.FC<TabsCategoryComponentTypeProps> = (
  props
) => {
  const [value, setValue] = React.useState(1);

  useEffect(() => {
    props.onChangeTabsHandler("1");
  }, []);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChangeTabsHandler(newValue.toString());
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        bgcolor: "background.paper",
        marginBottom: "50px",
      }}
    >
      {
        props.categoryTypeList.length > 0 && (
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >

            {props.categoryTypeList.map((category) => (
              <Tab
                label={category.descripcion}
                value={category.idDescripcion}
                key={category.idDescripcion}
                sx={{ fontFamily: "Rubik-SemiBold" }}
              />
            ))}
          </Tabs>
        )
      }

    </Box>
  );
};

export default TabsCategoryComponentType;
