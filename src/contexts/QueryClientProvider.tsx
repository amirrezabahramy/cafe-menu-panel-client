import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import useQueryHandler from "@/hooks/useQueryHandler";

import { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "./AuthProvider";

type TProps = {
  children: React.ReactNode;
};

function QueryClientProvider({ children }: TProps) {
  // Hooks
  const { handleSuccess, handleError } = useQueryHandler();
  const { loggedInUser, logoutUser } = useAuth();

  // Query client setup
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleError(error as AxiosError, logoutUser);
          },
        }),
        defaultOptions: {
          mutations: {
            onSuccess: (data) => {
              handleSuccess(data as AxiosResponse);
            },
            onError: (error) => {
              handleError(error as AxiosError, logoutUser);
            },
          },
        },
      }),
    []
  );

  useEffect(() => {
    const cleanUp = () => {
      if (!loggedInUser) {
        queryClient.removeQueries();
      }
    };
    cleanUp();
    return cleanUp;
  }, [loggedInUser]);

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}

export default QueryClientProvider;
