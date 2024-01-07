import { AxiosError, AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";

// Types
type TProps = {
  children: React.ReactNode;
};

type TSeverity = Status;

type TTriggerAuto = (
  severity: TSeverity,
  data?: AxiosResponse,
  error?: AxiosError
) => void;

type TTriggerManual = (severity: TSeverity, message: string) => void;

type TClose = () => void;

type TSnackbarState = {
  open: boolean;
  severity?: TSeverity;
  message?: string;
};

type TSnackbarContext = {
  info: TSnackbarState;
  triggerAuto: TTriggerAuto;
  triggerManual: TTriggerManual;
  close: TClose;
};

// Context
const SnackbarContext = createContext<TSnackbarContext>({
  info: { open: false },
  triggerAuto: () => {},
  triggerManual: () => {},
  close: () => {},
});

// Provider
function SnackbarProvider({ children }: TProps) {
  const [snackbar, setSnackbar] = useState<TSnackbarState>({
    open: false,
  });

  const triggerAuto: TTriggerAuto = (severity, data, error) => {
    setSnackbar({
      open: true,
      severity,
      message:
        (severity === "success" ? data?.statusText : error?.message) ||
        "خطایی رخ داده است.",
    });
  };

  const triggerManual: TTriggerManual = (severity, message) => {
    setSnackbar({
      open: true,
      severity,
      message,
    });
  };

  const close = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider
      value={{ info: snackbar, triggerAuto, triggerManual, close }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

// Consumer
export function useSnackbar() {
  return useContext(SnackbarContext);
}

export default SnackbarProvider;
