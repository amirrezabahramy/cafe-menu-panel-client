import { removeHeader, setHeader } from "@/services/api";
import { TUser } from "@/types/models";
import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

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

// Setting token on page load
const token = typedLocalStorage.getItem("token");
token && setHeader("Authorization", `Bearer ${token}`);

function AuthProvider({ children }: TProps) {
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

  return (
    <AuthContext.Provider value={{ loggedInUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
