import React from "react";
import { Button, LoadingTitle, Title } from "./BaseButton.styles";

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  hoverBgColor?: string;
  colorText?: string;
  hoverColorText?: string;
  textSize?: string;
  fontText?: string;
  border?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  borderRadius?: string;
  padding?: string;
  label: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  spinnerColor?: string;
  spaceIcons?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hoverBoxShadow?: boolean;
  onClick?: () => void;
  onPointerEnter?: React.PointerEventHandler<HTMLButtonElement> | undefined;
  onPointerLeave?: React.PointerEventHandler<HTMLButtonElement> | undefined;
  "aria-label"?: string;
}

const BaseButton = ({
  className,
  disabled,
  loading,
  backgroundColor,
  hoverBgColor,
  colorText,
  fontText,
  hoverColorText,
  textSize,
  label,
  padding,
  borderRadius,
  borderColor,
  border,
  hoverBorderColor,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  spaceIcons,
  rightIcon,
  hoverBoxShadow,
  onClick,
  onPointerEnter,
  onPointerLeave,
  "aria-label": ariaLabel,
}: BaseButtonProps) => {
  return (
    <Button
      role="button"
      className={className}
      $backgroundColor={backgroundColor}
      $hoverBgColor={disabled ? backgroundColor : hoverBgColor}
      $borderColor={borderColor}
      $hoverBorderColor={hoverBorderColor}
      disabled={disabled}
      $borderRadius={borderRadius}
      border={border}
      $padding={padding}
      $loading={loading}
      $width={width}
      $height={height}
      $minWidth={minWidth}
      $minHeight={minHeight}
      $maxWidth={maxWidth}
      $maxHeight={maxHeight}
      $hoverColorText={hoverColorText}
      $hoverBoxShadow={hoverBoxShadow}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <LoadingTitle data-testid="contentinfo" $spaceIcons={spaceIcons}>
        <Title
          data-testid="heading"
          $colorText={colorText}
          $textSize={textSize}
          $hoverColorText={hoverColorText}
          $fontText={fontText}
        >
          {label}
        </Title>
        {rightIcon && rightIcon}
      </LoadingTitle>
    </Button>
  );
};

export default BaseButton;
