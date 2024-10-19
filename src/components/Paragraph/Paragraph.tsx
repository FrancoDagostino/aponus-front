import React from "react";
import { StyledParagraph } from "./Paragraph.styles";

export interface ParagraphProps {
  children: React.ReactNode;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
}

const Paragraph = ({
  children,
  fontFamily,
  fontSize,
  fontColor,
}: ParagraphProps) => {
  return (
    <StyledParagraph
      $fontFamily={fontFamily}
      $fontSize={fontSize}
      $fontColor={fontColor}
    >
      {children}
    </StyledParagraph>
  );
};

export default Paragraph;
