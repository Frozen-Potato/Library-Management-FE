import {
    StyledEngineProvider,
    ThemeOptions,
    ThemeProvider,
    createTheme
} from '@mui/material/styles'
import { ReactNode, createContext, useMemo, useState } from 'react';

type ThemeContextType = {
    switchColorMode: () => void;
}

type ThemeProviderProps = {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({
    switchColorMode: () => {}
})

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#A1662F',
    },
    secondary: {
      main: '#9C27B0',
    },
    background: {
      default: '#EAD2AC',
      paper: '#ECE5DD',
    },
  },
};

export const ThemeContextProvider = ({ children } : ThemeProviderProps) =>{
    const [mode, setMode] = useState<"light" | "dark">("light");

    const switchColorMode = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };


    const theme = useMemo(
        () => 
            createTheme(mode === "light" ? themeOptions : {
                palette: {
                    mode,
                },
            }),
            [mode]
    );

    return (
        <StyledEngineProvider injectFirst>
            <ThemeContext.Provider value={{ switchColorMode }}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        </StyledEngineProvider>
    )
}