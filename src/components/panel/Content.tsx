import { Box, Paper } from "@mui/material";
import { sidebarWidth } from "./sidebar/Sidebar";
import { navbarHeight } from "./Navbar";
import { panelDefaultOpacity } from "./Panel";
import { Outlet } from "@tanstack/react-router";

function Content() {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${sidebarWidth + 80}px)` },
        height: {
          xs: `calc(100% - ${navbarHeight.xs + 45}px)`,
          sm: `calc(100% - ${navbarHeight.sm + 80}px)`,
          md: `calc(100% - ${navbarHeight.md + 80}px)`,
        },
        mx: {
          xs: 2.5,
          sm: 5,
          md: 0,
        },
        pt: {
          xs: `${navbarHeight.xs + 22.5}px`,
          sm: `${navbarHeight.sm + 40}px`,
          md: `${navbarHeight.md + 40}px`,
        },
        px: { md: `${sidebarWidth + 47.5}px` },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 1,
          opacity: panelDefaultOpacity,
        }}
        component={Paper}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Content;
