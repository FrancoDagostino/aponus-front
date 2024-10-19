import styled from "styled-components";

interface ICellProps {
  $direction?: "column" | "column-reverse" | "initial" | "revert";
  $yAlign?: "center" | "flex-end" | "flex-start";
  $xAling?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-evenly"
    | "space-between";

  $smWidth?: "none" | string;
  $mdWidth?: "none" | string;
  $lgWidth?: "none" | string;
  $padding?: string;
}

export const Cell = styled.span<ICellProps>`
  padding: ${(props) => props.$padding};
  flex-direction: ${(props) => props.$direction};
  align-items: ${(props) => props.$yAlign};
  justify-content: ${(props) => props.$xAling};
  flex-wrap: "wrap";
  box-sizing: border-box;
  display: ${(props) => (props.$smWidth === "none" ? "none" : "flex")};
  width: ${(props) => props.$smWidth};

  @media only screen and (min-width: 700px) {
    display: ${(props) => (props.$mdWidth === "none" ? "none" : "flex")};
    width: ${(props) => props.$mdWidth};
  }

  @media only screen and (min-width: 1280px) {
    display: ${(props) => (props.$lgWidth === "none" ? "none" : "flex")};
    width: ${(props) => props.$lgWidth};
  }
`;
