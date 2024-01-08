import { useAuth } from "@/contexts/AuthProvider";
import AdminOrderItemsList from "../generic/AdminOrderItemsList";
import CustomerOrderItemsList from "../generic/CustomerOrderItemsList";

function ColdDrinksList() {
  const { loggedInUser } = useAuth();
  const url = "cold-drinks";
  return loggedInUser?.role === "admin" ? (
    <AdminOrderItemsList url={url} />
  ) : (
    <CustomerOrderItemsList url={url} />
  );
}

export default ColdDrinksList;
