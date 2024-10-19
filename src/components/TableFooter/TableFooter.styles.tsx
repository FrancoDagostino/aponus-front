import styled from "styled-components";

export interface ContainerStyled {
  $width?: string;
  $height?: string;
  $border?: string;
  $padding?: string;
  $background?: string;
}

export const ContainerStyled = styled.div<ContainerStyled>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: ${(props) => (props.$height ? props.$height : "auto")};
  border: 1px solid blue;
  border-radius: 8px;
  padding: ${(props) => (props.$padding ? props.$padding : "8px")};
  background-color: "blue";
  color: "lighBlue";
  box-sizing: border-box;
`;

export const ContainerRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  gap: 10px;
  height: auto;
`;
