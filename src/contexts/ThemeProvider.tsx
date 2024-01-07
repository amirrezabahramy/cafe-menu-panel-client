import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
  createTheme,
} from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { palette } from "@/css-in-js/variables";
import { useLocalConfig } from "./LocalConfigProvider";

// Types
type TProps = {
  children: React.ReactNode;
};

type TMode = PaletteMode;

type TToggleMode = () => void;
type TColorByMode = (reversed?: boolean) => "#18181B" | "#FAFAFA";

type TThemeContext = {
  mode: TMode;
  toggleMode: TToggleMode;
  colorByMode: TColorByMode;
};

// Context
const ThemeContext = createContext<TThemeContext>({
  mode: "light",
  toggleMode: () => {},
  colorByMode: () => "#18181B",
});

function ThemeProvider({ children }: TProps) {
  // Hooks
  const { addItems, getItems } = useLocalConfig();

  // States
  const [mode, setMode] = useState<TMode>(getItems().mode || "light");

  // Functions
  const toggleMode: TToggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colorByMode: TColorByMode = (reversed = false) =>
    mode === "light"
      ? reversed
        ? "#18181B"
        : "#FAFAFA"
      : reversed
      ? "#FAFAFA"
      : "#18181B";

  // Context values
  const cacheRtl = useMemo(
    () =>
      createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, stylisRTLPlugin],
      }),
    []
  );

  const muiTheme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: {
          fontSize: 14,
          fontFamily: ["IRRegular", "-apple-system", "sans-serif"].join(", "),
        },
        palette: {
          mode,
          text: {
            primary: colorByMode(true),
          },
          ...palette,
        },
        shape: {
          borderRadius: 2,
        },
        components: {
          MuiSelect: {
            defaultProps: {
              size: "small",
            },
          },
          MuiIconButton: {
            defaultProps: {
              size: "small",
            },
          },
          MuiTextField: {
            defaultProps: {
              size: "small",
              variant: "outlined",
            },
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    const changeMode = () => {
      const body = document.getElementsByTagName("body").item(0);
      if (body) {
        body.className = mode;
        addItems(["mode", mode]);
      }
    };
    changeMode();
  }, [mode]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeContext.Provider value={{ mode, toggleMode, colorByMode }}>
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
