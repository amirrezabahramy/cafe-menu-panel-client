import api from "@/services/api";
import { TOrderItemListData } from "@/types/queries/order-item";
import { useQuery } from "@tanstack/react-query";
import AsyncComponent from "./AsyncComponent";
import { AxiosError } from "axios";
import FlexListContainer from "./FlexListContainer";
import OrderItemCard from "./OrderItemCard";

type TProps = {
  url: "food" | "hot-drinks" | "cold-drinks";
};

function CustomerOrderItemsList({ url }: TProps) {
  // Get all
  const {
    isLoading,
    isError,
    error,
    data: orderItems,
  } = useQuery({
    queryKey: [`get-all-${url}`],
    queryFn: () => api.get<void, TOrderItemListData>(url),
    select: (data) => data.data,
  });
  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      <FlexListContainer>
        {orderItems?.map((orderItem) => (
          <OrderItemCard
            key={orderItem._id}
            name={orderItem.name}
            image={orderItem.image}
            description={orderItem.description}
            price={orderItem.price}
          />
        ))}
      </FlexListContainer>
    </AsyncComponent>
  );
}

export default CustomerOrderItemsList;
