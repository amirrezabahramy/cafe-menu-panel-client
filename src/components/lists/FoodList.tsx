import { useAuth } from "@/contexts/AuthProvider";
import AdminOrderItemsList from "../generic/AdminOrderItemsList";
import CustomerOrderItemsList from "../generic/CustomerOrderItemsList";

function FoodList() {
  const { loggedInUser } = useAuth();
  const url = "food";
  return loggedInUser?.role === "admin" ? (
    <AdminOrderItemsList url={url} />
  ) : (
    <CustomerOrderItemsList url={url} />
  );
}

export default FoodList;
