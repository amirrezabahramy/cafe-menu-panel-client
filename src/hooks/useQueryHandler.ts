import { useSnackbar } from "@/contexts/SnackbarProvider";
import { AxiosError, AxiosResponse } from "axios";

type THandleSuccess = (data: AxiosResponse) => void;
type THandleError = (error: AxiosError, logoutFn: () => void) => void;

function useQueryHandler() {
  const { triggerAuto } = useSnackbar();

  const handleSuccess: THandleSuccess = (data) => {
    triggerAuto("success", data);
  };

  const handleError: THandleError = (error, logoutFn) => {
    triggerAuto("error", undefined, error);
    if (error.response?.status === 401) {
      logoutFn();
    }
  };

  return { handleSuccess, handleError };
}

export default useQueryHandler;
