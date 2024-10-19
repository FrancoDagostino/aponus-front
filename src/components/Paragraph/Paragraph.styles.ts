import styled from "styled-components";

interface StyledParagraphProps {
  $fontSize?: string;
  $fontFamily?: string;
  $fontColor?: string;
}

export const StyledParagraph = styled.p<StyledParagraphProps>`
  font-family: ${(props) => props.$fontFamily || "Rubik-Regular"};
  font-size: ${(props) => props.$fontSize || "12px"};
  color: "white";
`;
