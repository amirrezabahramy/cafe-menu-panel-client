import AdminPanel, { TSidebarItems } from "@/components/panel/Panel";
import {
  AcUnit,
  Comment,
  Dashboard,
  ExitToApp,
  LocalFireDepartment,
  RestaurantMenu,
} from "@mui/icons-material";
import { useMemo } from "react";

function Admin() {
  const sidebarItems: TSidebarItems = useMemo(
    () => [
      {
        icon: <Dashboard />,
        text: "داشبورد",
        route: "dashboard",
      },
      {
        icon: <RestaurantMenu />,
        text: "غذا",
        route: "food",
      },
      {
        icon: <LocalFireDepartment />,
        text: "نوشیدنی های گرم",
        route: "hot-drinks",
      },
      {
        icon: <AcUnit />,
        text: "نوشیدنی های سرد",
        route: "cold-drinks",
      },
      {
        icon: <Comment />,
        text: "نظرات کاربران",
        route: "reviews",
      },
      {
        icon: <ExitToApp />,
        text: "خروج",
        route: "/auth/login",
      },
    ],
    []
  );

  return <AdminPanel sidebarItems={sidebarItems} />;
}

export default Admin;
