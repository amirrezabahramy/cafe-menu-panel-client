import { LinearProgress, Stack, Typography } from "@mui/material";
import Centered from "./Centered";
import { palette } from "@/css-in-js/variables";

type TProps = {
  message: string;
  isLoader: boolean;
};

function FullPageInfoComponent({ message, isLoader }: TProps) {
  return (
    <>
      <Centered
        component={isLoader ? Stack : undefined}
        //@ts-ignore
        spacing={isLoader ? 1.25 : undefined}
        sx={{
          width: 1,
          maxWidth: 300,
          height: 50,
        }}
      >
        {isLoader && <LinearProgress />}
        <Typography sx={{ textAlign: "center" }} color={palette.primary.dark}>
          {`${message}${isLoader ? "..." : ""}`}
        </Typography>
      </Centered>
    </>
  );
}

export default FullPageInfoComponent;
