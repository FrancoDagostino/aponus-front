/* eslint-disable @typescript-eslint/no-empty-interface */
import { PaginationComponentProps } from "react-data-table-component";
import {
  StyledContentPagination,
  StyledTablePagination,
} from "./TablePagination.styles";
import BaseButton from "../BaseButton/BaseButton";

export interface ITablePaginationProps extends PaginationComponentProps { }

const TablePagination = ({
  rowsPerPage,
  rowCount,
  currentPage,
  onChangePage,
}: ITablePaginationProps) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const leftNumber = currentPage === 1 ? 1 : currentPage - 1;
  const rightNumber = currentPage === totalPages ? totalPages : currentPage + 1;
  const middleNumber =
    currentPage === 1 || currentPage === totalPages ? "" : currentPage;
  return (
    <StyledTablePagination
      $display="flex"
      $flexDirection="row"
      $justifyContent="flex-end"
      $alignItems="center"
      style={{ position: "relative" }}
      data-testid="table-pagination"
    >
      <StyledContentPagination
        $display="flex"
        $flexDirection="row"
        $justifyContent="center"
        $alignItems="center"
        width="fit-content"
        height="20px"
      >
        {currentPage > 1 && (
          <BaseButton
            onClick={() => onChangePage(currentPage - 1, rowCount)}
            label={"❮"}
            textSize="12px"
            width="50px"
            height="20px"
            padding="0px"
            colorText="blue"
            hoverColorText="ligthBlue"
            border={`0.2px solid blue`}
            borderColor="blue"
            backgroundColor="white"
            hoverBgColor="blue"
            borderRadius={"5px 0px 0px 5px"}
            aria-label="Página Anterior"
          />
        )}
        <BaseButton
          onClick={() => onChangePage(leftNumber, rowCount)}
          label={`${leftNumber}`}
          aria-label={`Página ${leftNumber}`}
          width="50px"
          height="20px"
          padding="0px"
          colorText="blue"
          hoverColorText="ligthBlue"
          border={`0.2px solid blue`}
          borderColor="blue"
          backgroundColor="white"
          hoverBgColor="blue"
          borderRadius={currentPage === 1 ? "5px 0px 0px 5px" : "0px"}
          data-testid="left-page"
        />
        {middleNumber && (
          <BaseButton
            label={`${middleNumber}`}
            aria-label={`Página ${middleNumber}`}
            width="50px"
            height="20px"
            padding="0px"
            colorText="blue"
            hoverColorText="ligthBlue"
            border={`0.2px solid blue`}
            borderColor="blue"
            backgroundColor="white"
            hoverBgColor="blue"
            borderRadius={"0px"}
            data-testid="middle-page"
          />
        )}
        <BaseButton
          onClick={() => onChangePage(rightNumber, rowCount)}
          label={`${rightNumber}`}
          aria-label={`Página ${rightNumber}`}
          width="50px"
          height="20px"
          padding="0px"
          colorText="blue"
          hoverColorText="ligthBlue"
          border={`0.2px solid blue`}
          borderColor="blue"
          backgroundColor="white"
          hoverBgColor="blue"
          borderRadius={currentPage === totalPages ? "0px 5px 5px 0px" : "0px"}
          data-testid="right-page"
        />
        {currentPage < totalPages && (
          <BaseButton
            onClick={() => onChangePage(currentPage + 1, rowCount)}
            label={"❯"}
            textSize="12px"
            width="50px"
            height="20px"
            padding="0px"
            colorText="blue"
            hoverColorText="ligthBlue"
            border={`0.2px solid blue`}
            borderColor="blue"
            backgroundColor="white"
            hoverBgColor="blue"
            borderRadius={"0px 5px 5px 0px"}
            aria-label={"Página Siguiente"}
          />
        )}
      </StyledContentPagination>
    </StyledTablePagination>
  );
};

export default TablePagination;

export type { PaginationComponentProps };
