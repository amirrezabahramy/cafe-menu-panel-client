import { Box, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";

type TProps = {
  isLoading: boolean;
  isError: boolean;
  error?: AxiosError;
  children: React.ReactNode;
};

function AsyncComponent({ isLoading, isError, error, children }: TProps) {
  if (isLoading) {
    return <CircularProgress classes={{ root: "legacy-center" }} />;
  }

  if (isError) {
    return (
      <Box className="legacy-center">
        <Typography>
          Error occured.{error && `details: ${error.message}`}
        </Typography>
      </Box>
    );
  }

  return children;
}

export default AsyncComponent;
