import React from "react";
import { ContainerRowStyled, ContainerStyled } from "./TableFooter.styles";
import TablePagination, {
  ITablePaginationProps,
} from "../TablePagination/TablePagination";
import Paragraph from "../Paragraph/Paragraph";

export interface TableFooterProps extends ITablePaginationProps {
  entityName: string;
  className?: string;
  width?: string;
  height?: string;
  padding?: string;
  background?: string;
  border?: string;
  style?: React.CSSProperties;
}

const TableFooter = ({
  entityName,
  className,
  width,
  height,
  padding,
  background,
  border,
  currentPage,
  rowsPerPage,
  rowCount,
  style,
  onChangePage,
  onChangeRowsPerPage,
}: TableFooterProps) => {
  return (
    <ContainerStyled
      data-testid="TableFooter"
      className={className}
      $width={width}
      $height={height}
      $padding={padding}
      $background={background}
      $border={border}
      style={style}
    >
      <ContainerRowStyled>
        <Paragraph>{`Mostrando ${
          currentPage === 1 ? 1 : rowsPerPage * currentPage - rowsPerPage
        } a ${
          rowsPerPage * currentPage
        } de ${rowCount} ${entityName}`}</Paragraph>
      </ContainerRowStyled>
      <TablePagination
        rowsPerPage={rowsPerPage}
        rowCount={rowCount}
        currentPage={currentPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </ContainerStyled>
  );
};

export default TableFooter;
