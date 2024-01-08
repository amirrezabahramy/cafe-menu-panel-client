import { useAuth } from "@/contexts/AuthProvider";
import AdminOrderItemsList from "../generic/AdminOrderItemsList";
import CustomerOrderItemsList from "../generic/CustomerOrderItemsList";

function HotDrinksList() {
  const { loggedInUser } = useAuth();
  const url = "hot-drinks";
  return loggedInUser?.role === "admin" ? (
    <AdminOrderItemsList url={url} />
  ) : (
    <CustomerOrderItemsList url={url} />
  );
}

export default HotDrinksList;
