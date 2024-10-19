import React from "react";
import { FC } from "react";
import { Cell } from "./Cell.styles";

export interface ICellComponentProps {
  id?: string;
  direction?: "column" | "column-reverse" | "initial" | "revert";
  yAlign?: "center" | "flex-end" | "flex-start";
  xAling?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-evenly"
    | "space-between";

  smWidth?: "none" | string;
  mdWidth?: "none" | string;
  lgWidth?: "none" | string;
  padding?: string;
  children?: React.ReactNode;
  className?: string;
}

const CellComponent: FC<ICellComponentProps> = ({
  id = "",
  direction = "initial",
  yAlign = "flex-start",
  xAling = "flex-start",
  smWidth = "100%",
  mdWidth = "50%",
  lgWidth = "33.33%",
  padding = "0px",
  children,
  className,
}) => {
  return (
    <Cell
      id={id}
      $direction={direction}
      $yAlign={yAlign}
      $xAling={xAling}
      $smWidth={smWidth}
      $mdWidth={mdWidth}
      $lgWidth={lgWidth}
      $padding={padding}
      className={className}
    >
      {children}
    </Cell>
  );
};

export default CellComponent;
