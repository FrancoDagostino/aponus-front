import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { FC, ReactNode } from "react"
import { mainTheme } from "./mainTheme"

interface AppThemeProps {
    children: ReactNode
}

export const AppTheme: FC<AppThemeProps> = (props) => {

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )
}