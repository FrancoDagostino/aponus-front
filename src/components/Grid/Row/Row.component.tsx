import { FC, ReactNode } from "react";
import { Row } from "./Row.styles";

export interface IRowComponentProps {
  children?: ReactNode;
  direction?: "row" | "row-reverse";
  xAlign?:
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-around"
  | "space-evelyn"
  | "space between";
  className?: string;
  padding?: string;
  id?: string;
}

const RowComponent: FC<IRowComponentProps> = ({
  direction = "row",
  xAlign = "center",
  children = null,
  className,
  padding = "0px",
  id = "",
}) => {
  return (
    <Row
      id={id}
      $direction={direction}
      $xAlign={xAlign}
      $padding={padding}
      className={className}
    >
      {children}
    </Row>
  );
};
export default RowComponent;
