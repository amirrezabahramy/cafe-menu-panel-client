import "./App.css";
import ThemeProvider from "./contexts/ThemeProvider";
import LocalConfigProvider from "./contexts/LocalConfigProvider";
import SnackbarProvider from "./contexts/SnackbarProvider";
import ClientProvider from "./contexts/ClientProvider";

import {
  Outlet,
  lazyRouteComponent as lazy,
  RouterProvider,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";

// Layouts
const Auth = lazy(() => import("@/layouts/auth"));
const AuthLogin = lazy(() => import("@/layouts/auth/login"));

// Routes
const rootRoute = new RootRoute({
  component: () => (
    <>
      <LocalConfigProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <ClientProvider>
              <Outlet />
            </ClientProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalConfigProvider>
    </>
  ),
});

const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: Auth,
});

const authLoginRoute = new Route({
  getParentRoute: () => authRoute,
  path: "login",
  component: AuthLogin,
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([authLoginRoute]),
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
