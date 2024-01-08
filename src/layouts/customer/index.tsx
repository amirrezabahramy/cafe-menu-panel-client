import CustomerPanel, { TSidebarItems } from "@/components/panel/Panel";
import { Dashboard } from "@mui/icons-material";
import { useMemo } from "react";

function Customer() {
  const sidebarItems: TSidebarItems = useMemo(
    () => [
      {
        icon: <Dashboard />,
        text: "داشبورد",
        route: "dashboard",
      },
    ],
    []
  );

  return <CustomerPanel sidebarItems={sidebarItems} />;
}

export default Customer;
