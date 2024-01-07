import { Box, BoxProps } from "@mui/material";

function Centered({ children, ...rest }: BoxProps) {
  return (
    <Box className="legacy-center" {...rest}>
      {children}
    </Box>
  );
}

export default Centered;
