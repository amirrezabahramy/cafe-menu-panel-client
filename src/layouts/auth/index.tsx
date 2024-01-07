import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { backgroundImages } from "@/css-in-js/styles";

function Auth() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...backgroundImages.bgLogin.light,
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Auth;
