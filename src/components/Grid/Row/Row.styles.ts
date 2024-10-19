import styled from "styled-components";

interface IRowProps {
  $direction?: "row" | "row-reverse";
  $xAlign?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-evelyn"
    | "space between";
  $padding?: string;
}

export const Row = styled.div<IRowProps>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$xAlign};
  flex-wrap: wrap;
  padding: ${(props) => props.$padding};
`;
