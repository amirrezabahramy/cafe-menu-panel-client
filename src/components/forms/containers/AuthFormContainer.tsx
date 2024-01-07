import { useTheme } from "@/contexts/ThemeProvider";
import { boxShadows } from "@/css-in-js/styles";
import { Stack, StackProps, Typography } from "@mui/material";

type TProps = StackProps;

function AuthFormContainer({ children, sx, ...rest }: TProps) {
  const { colorByMode } = useTheme();
  return (
    <Stack
      sx={{
        textAlign: "center",
        px: 5,
        py: 8,
        m: 2,
        bgcolor: colorByMode(),
        borderRadius: 2,
        width: "300px",
        boxShadow: boxShadows.medium,
        ...sx,
      }}
      spacing={2}
      {...rest}
    >
      <Typography variant="h5" color={colorByMode(true)}>
        صفحه ورود
      </Typography>
      {children}
    </Stack>
  );
}

export default AuthFormContainer;
