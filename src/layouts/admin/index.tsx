import AdminPanel, { TSidebarItems } from "@/components/panel/Panel";
import {
  AcUnit,
  Dashboard,
  ExitToApp,
  LocalFireDepartment,
  RestaurantMenu,
} from "@mui/icons-material";
import { useMemo } from "react";

function Admin() {
  const sideBarItems: TSidebarItems = useMemo(
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
        icon: <ExitToApp />,
        text: "خروج",
        route: "/auth/login",
      },
    ],
    []
  );

  return <AdminPanel sidebarItems={sideBarItems} />;
}

export default Admin;
