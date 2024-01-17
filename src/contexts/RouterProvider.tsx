import FullPageInfoComponent, {
  LOADING_MESSAGE,
} from "@/components/generic/FullPageInfoComponent";
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
const AdminFoodLayout = lazy(() => import("@/layouts/admin/outlets/food"));
const AdminHotDrinksLayout = lazy(
  () => import("@/layouts/admin/outlets/hot-drinks")
);
const AdminColdDrinksLayout = lazy(
  () => import("@/layouts/admin/outlets/cold-drinks")
);
const AdminReviewsLayout = lazy(
  () => import("@/layouts/admin/outlets/reviews")
);

// Customer
const CustomerLayout = lazy(() => import("@/layouts/customer"));
const CustomerFoodLayout = lazy(
  () => import("@/layouts/customer/outlets/food")
);
const CustomerHotDrinksLayout = lazy(
  () => import("@/layouts/customer/outlets/hot-drinks")
);
const CustomerColdDrinksLayout = lazy(
  () => import("@/layouts/customer/outlets/cold-drinks")
);
/*** Layouts ***/

/*** Redirect Fn ***/
const redirectFn: TRedirectFn = async ({ location }) => {
  const loggedInUser = JSON.parse(
    typedLocalStorage.getItem("loggedInUser") || "null"
  );
  if (
    !loggedInUser?.role &&
    location.pathname !== "/auth/login" &&
    location.pathname !== "/customer/food"
  ) {
    return redirect({ to: "/customer/food" });
  } else if (
    loggedInUser &&
    !location.pathname.startsWith(`/${loggedInUser.role}`)
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

const customerFoodRoute = new Route({
  getParentRoute: () => customerRoute,
  path: "food",
  component: CustomerFoodLayout,
});

const customerHotDrinksRoute = new Route({
  getParentRoute: () => customerRoute,
  path: "hot-drinks",
  component: CustomerHotDrinksLayout,
});

const customerColdDrinksRoute = new Route({
  getParentRoute: () => customerRoute,
  path: "cold-drinks",
  component: CustomerColdDrinksLayout,
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
  customerRoute.addChildren([
    customerFoodRoute,
    customerHotDrinksRoute,
    customerColdDrinksRoute,
  ]),
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
