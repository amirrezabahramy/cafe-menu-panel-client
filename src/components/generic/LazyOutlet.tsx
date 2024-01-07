import { CircularProgress } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

function LazyOutlet() {
  return (
    <Suspense
      fallback={<CircularProgress classes={{ root: "legacy-center" }} />}
    >
      <Outlet />
    </Suspense>
  );
}

export default LazyOutlet;
