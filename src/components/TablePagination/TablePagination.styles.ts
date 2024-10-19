import styled from "styled-components";

interface StyledTablePaginationProps {
  $display: string;
  $flexDirection: string;
  $justifyContent: string;
  $alignItems: string;
}

interface StyledContentPaginationProps {
  $display: string;
  $flexDirection: string;
  $justifyContent: string;
  $alignItems: string;
  width: string;
  height: string;
}

export const StyledTablePagination = styled.div<StyledTablePaginationProps>`
  display: ${(props) => props.$display};
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
`;

export const StyledContentPagination = styled.div<StyledContentPaginationProps>`
  display: ${(props) => props.$display};
  flex-direction: ${(props) => props.$flexDirection};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
