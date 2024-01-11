import CustomerPanel, { TSidebarItems } from "@/components/panel/Panel";
import {
  AcUnit,
  LocalFireDepartment,
  RestaurantMenu,
} from "@mui/icons-material";
import { useMemo } from "react";

function Customer() {
  const sidebarItems: TSidebarItems = useMemo(
    () => [
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
    ],
    []
  );

  return <CustomerPanel sidebarItems={sidebarItems} />;
}

export default Customer;
