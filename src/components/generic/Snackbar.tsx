import { useSnackbar } from "@/contexts/SnackbarProvider";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";

function Snackbar() {
  const {
    info: { open, severity, message },
    close,
  } = useSnackbar();

  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      autoHideDuration={4000}
      onClose={close}
      open={open}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
