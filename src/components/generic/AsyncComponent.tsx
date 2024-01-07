import { Box, Typography } from "@mui/material";
import { AxiosError } from "axios";
import FullPageInfoComponent, {
  LOADING_MESSAGE,
} from "./FullPageInfoComponent";

type TProps = {
  isLoading: boolean;
  isError: boolean;
  error?: AxiosError;
  children: React.ReactNode;
};

function AsyncComponent({ isLoading, isError, error, children }: TProps) {
  if (isLoading) {
    return <FullPageInfoComponent message={LOADING_MESSAGE} isLoader />;
  }

  if (isError) {
    return (
      <Box className="legacy-center">
        <Typography>
          Error occured.{error && ` Details: ${error.message}`}
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}

export default AsyncComponent;
