import FullPageInfoComponent, {
  LOADING_MESSAGE,
} from "@/components/generic/FullPageInfoComponent";
import { TUser } from "@/types/models";
import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";
import {
  RootRoute,
  Route,
  Router,
  lazyRouteComponent as lazy,
  RouterProvider as TanstackRouterProvider,
  Outlet,
  redirect,
  ParsedLocation,
  NotFoundRoute,
} from "@tanstack/react-router";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

// Types
type TRedirectFn = ({ location }: { location: ParsedLocation<{}> }) => any;

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

// Customer
const CustomerLayout = lazy(() => import("@/layouts/customer"));
/*** Layouts ***/

/*** Redirect Fn ***/
const redirectFn: TRedirectFn = async ({ location }) => {
  const loggedInUser = JSON.parse(
    typedLocalStorage.getItem("loggedInUser") || "null"
  );
  console.log(location);
  if (!loggedInUser && location.href !== "/auth/login") {
    return redirect({ to: "/auth/login" });
  } else if (
    loggedInUser &&
    !location.href.startsWith(`/${loggedInUser.role}`)
  ) {
    return redirect({ to: `/${loggedInUser.role as "admin" | "customer"}` });
  }
};
/*** Redirect Fn ***/

/*** Routes ***/
// Root
const rootRoute = new RootRoute({
  beforeLoad: redirectFn,
  component: () => (
    <>
      <Outlet />
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

// Customer
const customerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "customer",
  component: CustomerLayout,
});

// Not found
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
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
  customerRoute,
  notFoundRoute,
]);

const router = new Router({
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

// Provider
function RouterProvider() {
  const { loggedInUser } = useAuth();
  const { navigate } = router;

  useEffect(() => {
    const properNavigate = () => {
      if (!loggedInUser) {
        navigate({ to: "/auth/login" });
      } else {
        navigate({ to: `/${loggedInUser.role}` });
      }
    };
    properNavigate();
  }, [loggedInUser]);

  return <TanstackRouterProvider router={router} />;
}

export default RouterProvider;
