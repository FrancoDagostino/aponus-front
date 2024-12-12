import { createTheme } from "@mui/material";
import { colors, fonts, fontSize } from "../utils/stylesVariables";

export const mainTheme = createTheme({
    palette: {
        primary: {
            main: colors.primaryColor,
        },
        secondary: {
            main: colors.secondaryColor
        },
        success: {
            main: colors.statusSuccess,
            contrastText: colors.neutroColorWhite
        },
        error: {
            main: colors.statusError,
            contrastText: colors.neutroColorWhite
        },
        warning: {
            main: colors.statusWarning,
            contrastText: colors.neutroColorBlack
        },
        info: {
            main: colors.statusInfo
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                    fontSize: fontSize.fontSizeBody2,
                    fontWeight: "500",
                    '&.MuiButton-contained': {

                    },
                    '&.MuiButton-containedSecondary': {
                    },
                    '&.MuiButton-outlinedSuccess': {
                        '&:hover': {
                            borderColor: '#388e3c', // Color del borde al hover para variant="outlined" success
                            color: '#388e3c', // Color del texto al hover para variant="outlined" success
                        },
                    },
                    '&.MuiButton-textSuccess': {
                        '&:hover': {
                            backgroundColor: 'rgba(56, 142, 60, 0.04)', // Color de fondo al hover para variant="text" success
                            color: '#388e3c', // Color del texto al hover para variant="text" success
                        },
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                    fontSize: fontSize.fontSizeBody,
                    fontWeight: '500',
                    textTransform: 'none',
                    color: colors.primaryColorLight2,
                    '&.Mui-selected': {
                        color: colors.primaryColor
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    paddingBottom: "20px",
                    '&.MuiTypography-h2': {
                        fontFamily: fonts.body,
                        fontSize: fontSize.fontSizeTitleH2,
                        fontWeight: "500",
                        color: colors.primaryColor
                    },
                    '&.MuiTypography-body1': {
                        fontFamily: fonts.body,
                        fontSize: fontSize.fontSizeBody2
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                    fontSize: fontSize.fontSizeBody2,
                    color: colors.neutroColorBlack,
                    '&.MuiTableCell-head': {
                        fontWeight: "500",
                        color: colors.neutroColorWhite,
                        background: colors.primaryColor,
                        textAlign: 'center'
                    },
                    '&.MuiTableCell-body': {
                    }
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: colors.primaryColorLight3,
                    }
                },
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                }
            }
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                    color: colors.primaryColor
                },
                selectLabel: {
                    fontFamily: fonts.body
                },
                displayedRows: {
                    fontFamily: fonts.body
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: fonts.body,
                    fontSize: fontSize.fontSizeTitleH2,
                    color: colors.primaryColor
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: "0px",
                    '& .MuiInputBase-root': {
                        color: colors.neutroColorBlack,
                        fontFamily: fonts.body,
                        '& .MuiSvgIcon-root': {
                            color: colors.primaryColor,
                            '&.Mui-focused': {
                                color: colors.primaryColor
                            }
                        },
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: colors.primaryColorLight2
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: colors.primaryColorLight3
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: colors.primaryColor
                    },
                    '& .MuiFormLabel-root': {
                        color: colors.primaryColorLight2,
                        fontFamily: fonts.body,
                        '&.Mui-focused': {
                            color: colors.primaryColor
                        }
                    }
                }
            }
        }
    }
});