import { Box, BoxProps } from "@mui/material";

function OverflowContainer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        overflow: "auto",
        maxHeight: { xs: "calc(100% - 26px)", md: 1 },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default OverflowContainer;
