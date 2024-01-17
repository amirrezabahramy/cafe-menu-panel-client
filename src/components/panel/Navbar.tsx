import {
  AppBar,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSidebar } from "@/contexts/SidebarProvider";
import { sidebarWidth } from "./sidebar/Sidebar";
import { panelDefaultOpacity } from "./Panel";
import { useTheme } from "@/contexts/ThemeProvider";

export const navbarHeight = {
  xs: 56,
  sm: 64,
  md: 64,
};

function Navbar() {
  const { setSidebarOpen } = useSidebar();
  const { mode, colorByMode, toggleMode } = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: colorByMode(),
        width: { md: `calc(100% - ${sidebarWidth}px)` },
        borderBottom: "1px solid",
        borderColor:
          mode === "light"
            ? "rgba(0, 0, 0, 0.108)"
            : "rgba(255, 255, 255, 0.108)",
        ml: { md: `${sidebarWidth}px` },
        boxShadow: "none",
        opacity: panelDefaultOpacity,
      }}
    >
      <Toolbar>
        <IconButton
          sx={{ mr: 2, display: { md: "none" } }}
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          <Menu />
        </IconButton>
        <FormControlLabel
          sx={{
            ml: "auto",
            color: colorByMode(true),
          }}
          label="حالت تاریک"
          control={<Switch checked={mode === "dark"} onChange={toggleMode} />}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
