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
import FullPageInfoComponent, {
  LOADING_MESSAGE,
} from "./components/generic/FullPageInfoComponent";

/*** Layouts ***/
// Auth
const AuthLayout = lazy(() => import("@/layouts/auth"));
const AuthLoginLayout = lazy(() => import("@/layouts/auth/login"));

// Admin
const AdminLayout = lazy(() => import("@/layouts/admin"));
const AdminFoodLayout = lazy(() => import("@/layouts/admin/food"));
const AdminHotDrinksLayout = lazy(() => import("@/layouts/admin/hot-drinks"));
const AdminColdDrinksLayout = lazy(() => import("@/layouts/admin/cold-drinks"));
const AdminReviewsLayout = lazy(() => import("@/layouts/admin/reviews"));
/*** Layouts ***/

/*** Routes ***/
// Root
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

// Auth
const authRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: AuthLayout,
});

const authLoginRoute = new Route({
  getParentRoute: () => authRoute,
  path: "login",
  component: AuthLoginLayout,
});

// Admin
const adminRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "admin",
  component: AdminLayout,
});

const adminFoodRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "food",
  component: AdminFoodLayout,
});

const adminHotDrinksRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "hot-drinks",
  component: AdminHotDrinksLayout,
});

const adminColdDrinksRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "cold-drinks",
  component: AdminColdDrinksLayout,
});

const adminReviewsRoute = new Route({
  getParentRoute: () => adminRoute,
  path: "reviews",
  component: AdminReviewsLayout,
});

// Creating route
const routeTree = rootRoute.addChildren([
  authRoute.addChildren([authLoginRoute]),
  adminRoute.addChildren([
    adminFoodRoute,
    adminHotDrinksRoute,
    adminColdDrinksRoute,
    adminReviewsRoute,
  ]),
]);

export const router = new Router({
  defaultPreload: "intent",
  routeTree,
  defaultPendingComponent: () => (
    <FullPageInfoComponent message={LOADING_MESSAGE} isLoader />
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
/*** Routes ***/

// Start
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
