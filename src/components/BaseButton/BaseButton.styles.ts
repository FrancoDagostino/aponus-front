import styled from "styled-components";

interface TitleProps {
  $colorText?: string;
  $hoverColorText?: string;
  $textSize?: string;
  $fontText?: string;
}

interface ButtonProps {
  $backgroundColor?: string;
  $width?: string;
  $height?: string;
  $minWidth?: string;
  $minHeight?: string;
  $maxWidth?: string;
  $maxHeight?: string;
  $borderRadius?: string;
  $disabled?: boolean;
  $loading?: boolean;
  $hoverBgColor?: string;
  $borderColor?: string;
  border?: string;
  $hoverBorderColor?: string;
  $padding?: string;
  $hoverColorText?: string;
  $hoverBoxShadow?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  height: ${(props) => (props.$height ? props.$height : "45px")};
  min-width: ${(props) => props.$minWidth};
  min-height: ${(props) => props.$minHeight};
  max-width: ${(props) => props.$maxWidth};
  max-height: ${(props) => props.$maxHeight};
  padding: ${(props) => props.$padding || "18px 12px"};
  border: ${(props) => props.border || `1px solid ${props.$borderColor}`};
  border-color: ${(props) =>
    !props.disabled ? props.$borderColor : props.theme.neutral.four};
  border-style: ${(props) => (props.$borderColor ? "solid" : "none")};
  border-radius: ${(props) => props.$borderRadius || "8px"};
  background: ${(props) =>
    !props.disabled ? props.$backgroundColor : props.theme.neutral.four};
  cursor: ${(props) =>
    props.disabled || props.$loading ? "not-allowed" : "pointer"};
  &:hover {
    background: ${(props) =>
      !props.disabled ? props.$hoverBgColor : props.theme.neutral.four};
    border-style: ${(props) => (props.$hoverBorderColor ? "solid" : "none")};
    border-color: ${(props) =>
      !props.disabled ? props.$hoverBorderColor : props.theme.neutral.four};
    box-shadow: ${(props) =>
      props.$hoverBoxShadow ? "6px 6px 12px 0px rgba(0, 0, 0, 0.3)" : "none"};
  }
  &:hover span {
    color: ${(props) => props.$hoverColorText};
  }
`;

export const Title = styled.span<TitleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${(props) =>
    props.$fontText ? props.$fontText : "Rubik-Regular"};
  font-size: ${(props) => (props.$textSize ? props.$textSize : "12px")};
  text-align: center;
  color: ${(props) => props.$colorText};
  &:hover {
    color: ${(props) => props.$hoverColorText};
  }
`;

export const LoadingTitle = styled.div<{ $spaceIcons?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.$spaceIcons || "4px"};
`;
