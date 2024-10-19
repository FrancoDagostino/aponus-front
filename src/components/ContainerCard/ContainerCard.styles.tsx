import styled from "styled-components";

export interface ContainerStyled {
  $display?: string;
  $width?: string;
  $height?: string;
  $margin?: string;
  $border?: string;
  $borderRadius?: string;
  $padding?: string;
  $background?: string;
  $flexDirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
}

export const ContainerStyled = styled.div<ContainerStyled>`
  display: ${(props) => (props.$display ? props.$display : "flex")};
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: ${(props) => (props.$height ? props.$height : "auto")};
  margin: ${(props) => (props.$margin ? props.$margin : "0px")};
  border: ${(props) => (props.$border ? props.$border : "none")};
  border-radius: ${(props) =>
    props.$borderRadius ? props.$borderRadius : "8px"};
  padding: ${(props) => (props.$padding ? props.$padding : "20px")};
  background-color: #c10808;
  flex-direction: ${(props) =>
    props.$flexDirection ? props.$flexDirection : "column"};
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : "flex-start"};
  align-items: ${(props) =>
    props.$alignItems ? props.$alignItems : "flex-start"};
  box-sizing: border-box;
`;
