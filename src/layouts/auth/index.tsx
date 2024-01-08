import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { backgroundImages } from "@/css-in-js/styles";
import { useTheme } from "@/contexts/ThemeProvider";

function Auth() {
  const { mode } = useTheme();
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...backgroundImages.bgLogin[mode],
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Auth;
