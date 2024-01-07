import { Box, Paper } from "@mui/material";
import { sidebarWidth } from "./sidebar/Sidebar";
import { navbarHeight } from "./Navbar";
import LazyOutlet from "../generic/LazyOutlet";
import { panelDefaultOpacity } from "./Panel";

function Content() {
  return (
    <Box
      sx={{
        width: { md: `calc(100% - ${sidebarWidth + 80}px)` },
        height: {
          xs: `calc(100% - ${navbarHeight.xs + 80}px)`,
          sm: `calc(100% - ${navbarHeight.sm + 80}px)`,
          md: `calc(100% - ${navbarHeight.md + 80}px)`,
        },
        mx: {
          xs: 2.5,
          sm: 5,
          md: 0,
        },
        pt: {
          xs: `${navbarHeight.xs + 40}px`,
          sm: `${navbarHeight.sm + 40}px`,
          md: `${navbarHeight.md + 40}px`,
        },
        pl: { md: `${sidebarWidth + 40}px` },
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
        <LazyOutlet />
      </Box>
    </Box>
  );
}

export default Content;
