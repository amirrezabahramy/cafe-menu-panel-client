import { removeHeader, setHeader } from "@/services/api";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import useQueryHandler from "@/hooks/useQueryHandler";
import { TUser } from "@/types/models";
import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";
import { AxiosError, AxiosResponse } from "axios";

// Types
type TProps = {
  children: React.ReactNode;
};

type TLoggedInUser =
  | (TUser & {
      exp: number;
      iat: number;
    })
  | null;
type TLoginUser = (token: string) => void;
type TLogoutUser = () => void;

type TAuthContext = {
  loggedInUser: TLoggedInUser;
  loginUser: TLoginUser;
  logoutUser: TLogoutUser;
};

// Context
const AuthContext = createContext<TAuthContext>({
  loggedInUser: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export const roles = {
  admin: "admin",
  user: "user",
};

// Setting token on page load
const token = typedLocalStorage.getItem("token");
token && setHeader("Authorization", `Bearer ${token}`);

function ClientProvider({ children }: TProps) {
  // Hooks
  const navigate = useNavigate();
  const { handleSuccess, handleError } = useQueryHandler();

  // Logged in user management
  const [loggedInUser, setLoggedInUser] = useState<TLoggedInUser>(
    JSON.parse(typedLocalStorage.getItem("loggedInUser") || "null")
  );

  const logoutUser = () => {
    removeHeader("Authorization");
    typedLocalStorage.removeItem("token");
    typedLocalStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  const loginUser: TLoginUser = (token) => {
    const user: TLoggedInUser = jwtDecode(token);
    setHeader("Authorization", `Bearer ${token}`);
    typedLocalStorage.setItem("token", token);
    typedLocalStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user);
  };

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

  // Navigation effect
  useEffect(() => {
    const properNavigate = () => {
      if (!loggedInUser) {
        queryClient.removeQueries();
        navigate({ to: "/auth/login" });
      } else {
        navigate({ to: loggedInUser.role });
      }
    };
    properNavigate();
  }, [loggedInUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ loggedInUser, loginUser, logoutUser }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export function useClient() {
  return useContext(AuthContext);
}

export default ClientProvider;
