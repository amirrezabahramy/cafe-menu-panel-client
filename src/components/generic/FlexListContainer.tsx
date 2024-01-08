import { Box, BoxProps } from "@mui/material";

function FlexListContainer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: { xs: 6, xl: 7 },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default FlexListContainer;
