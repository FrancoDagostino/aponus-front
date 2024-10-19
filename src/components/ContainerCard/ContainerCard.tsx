import React from 'react';
import { ContainerStyled } from './ContainerCard.styles';

export interface ContainerCardProps {
  children: React.ReactNode;
  className?: string;
  display?: string;
  width?: string;
  height?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  background?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
}

const ContainerCard = ({
  children,
  className,
  display,
  width,
  height,
  margin,
  border,
  borderRadius,
  padding,
  background,
  flexDirection,
  justifyContent,
  alignItems,
}: ContainerCardProps) => {
  return (
    <ContainerStyled
      data-testid="ContainerCard"
      className={className}
      $display={display}
      $width={width}
      $height={height}
      $margin={margin}
      $border={border}
      $borderRadius={borderRadius}
      $padding={padding}
      $background={background}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
    >
      {children}
    </ContainerStyled>
  );
};

export default ContainerCard;
