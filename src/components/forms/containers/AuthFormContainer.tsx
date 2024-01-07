import { boxShadows } from "@/css-in-js/styles";
import { palette } from "@/css-in-js/variables";
import { Stack, StackProps, Typography } from "@mui/material";

type TProps = StackProps;

function AuthFormContainer({ children, sx, ...rest }: TProps) {
  return (
    <Stack
      sx={{
        textAlign: "center",
        px: 5,
        py: 8,
        m: 2,
        bgcolor: palette.common.white,
        borderRadius: 2,
        width: "300px",
        boxShadow: boxShadows.medium,
        ...sx,
      }}
      spacing={2}
      {...rest}
    >
      <Typography>صفحه ورود</Typography>
      {children}
    </Stack>
  );
}

export default AuthFormContainer;
