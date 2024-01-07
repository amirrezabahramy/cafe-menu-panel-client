import { Box, Stack, Typography } from "@mui/material";
import { navbarHeight } from "../panel/Navbar";

type TProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function LayoutContainer({ title, description, children }: TProps) {
  const stackHeight = () => {
    if (title && description) {
      return 64;
    } else if (title && !description) {
      return 32;
    } else if (!title && description) {
      return 24;
    } else {
      return 0;
    }
  };

  return (
    <Box
      sx={{
        p: 3.25,
        height: {
          xs: `calc(100% - ${navbarHeight.xs + 8 + stackHeight()}px)`,
          sm: `calc(100% - ${navbarHeight.sm + 8 + stackHeight()}px)`,
          md: `calc(100% - ${navbarHeight.md + 8 + stackHeight()}px)`,
        },
      }}
    >
      {(title || description) && (
        <Stack spacing={1} sx={{ mb: 2 }}>
          {title && <Typography variant="h5">{title}</Typography>}
          {description && (
            <Typography color="GrayText" variant="body1">
              {description}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </Box>
  );
}

export default LayoutContainer;
