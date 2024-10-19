import { TableStyles } from "react-data-table-component";

export const customDatatableStyle = (): TableStyles => {
  return {
    table: {
      style: {
        gap: "10px",
        background: "transparent",
      },
    },
    tableWrapper: {
      style: {
        background: "transparent",
      },
    },
    headRow: {
      style: {
        background: "#FAFAFA",
        border: "1px solid #9D9D9D",
        borderRadius: "8px",
        minHeight: "40px",
        maxHeight: "40px",
      },
    },
    headCells: {
      style: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "#1C1C1E",
        width: "100%",
        fontSize: "16px",
        fontFamily: "Rubik-SemiBold",
        fontWeight: 600,
        lineHeight: "20px",
        maxHeight: "40px",
        minHeight: "40px",
        "&:hover > div": {
          color: "#085C98",
          cursor: "pointer",
        },
      },
    },
    rows: {
      style: {
        display: "flex",
        flexDirection: "row",
        minHeight: "36px",
        borderRadius: "8px",
        padding: "4px 0px",
        border: "none",
        background: "#F2F2F2",
        "& p": {
          fontSize: "12px",
          fontFamily: "Rubik-Regular",
          fontWeight: 400,
          lineHeight: "14px",
          color: "#1C1C1E",
        },
        "& div": {
          fontSize: "12px",
          fontFamily: "Rubik-Regular",
          fontWeight: 400,
          lineHeight: "14px",
          color: "#1C1C1E",
        },
        "&:not(:last-of-type)": {
          marginBottom: "8px",
        },
        "&:hover": {
          background: "#178F5D30",
          color: "#FFFFFF",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontFamily: "Rubik-Regular",
        fontWeight: 400,
        lineHeight: "20px",
        textAlign: "center",
        paddingLeft: "15px",
        paddingRight: "15px",
        wordBreak: "break-word",
      },
    },
    expanderRow: {
      style: {
        border: `1px solid '#407FAD'`,
        background: "#F2F2F2",
        padding: "20px 10px",
        borderRadius: "8px",
        marginBottom: "8px",
        color: "#1C1C1E",
      },
    },
    expanderButton: {
      style: {
        borderRadius: "50%",
        maxWidth: "20px",
        maxHeight: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        margin: "0px",
        background: "red",
        position: "relative",
        "& > svg": {
          position: "absolute",
          top: "-1px",
          fill: "red",
          minWidth: "15px",
          width: "20px",
        },
        "&:hover:not(:disabled)": {
          background: "#407FAD",
          color: "#FFFFFF",
        },
        "&:focus": {
          background: "#407FAD",
          color: "#FFFFFF",
        },
      },
    },
  };
};
