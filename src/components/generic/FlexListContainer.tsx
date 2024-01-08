import { Box, BoxProps } from "@mui/material";

function FlexListContainer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 6,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default FlexListContainer;
