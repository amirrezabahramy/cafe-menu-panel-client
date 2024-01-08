import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncComponent from "./AsyncComponent.tsx";
import { AxiosError } from "axios";
import OrderItemCardEditable from "./OrderItemCardEditable.tsx";
import FlexListContainer from "./FlexListContainer.tsx";
import { TPatchOrderItem } from "@/types/models/patch-models";
import {
  TOrderItemInstanceData,
  TOrderItemListData,
} from "@/types/queries/order-item.ts";
import { TPostOrderItem } from "@/types/models/post-models.ts";
import OrderItemCardAdder from "./OrderItemCardAdder.tsx";

type TProps = {
  url: "food" | "hot-drinks" | "cold-drinks";
};

function AdminOrderItemsList({ url }: TProps) {
  const queryClient = useQueryClient();

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

  // Add
  const { mutateAsync: addOrderItem } = useMutation({
    mutationKey: [`add-${url}`],
    mutationFn: (data: TPostOrderItem) =>
      api.post<TPostOrderItem, TOrderItemInstanceData>(url, data),
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [`get-all-${url}`] }),
  });

  // Update
  const { mutateAsync: updateOrderItem } = useMutation({
    mutationKey: [`update-${url}`],
    mutationFn: (data: TPatchOrderItem) =>
      api.patch<TPatchOrderItem, TOrderItemInstanceData>(
        `${url}/${data._id}`,
        data
      ),
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [`get-all-${url}`] }),
  });

  // Remove
  const { isPending: isRemoving, mutateAsync: removeOrderItem } = useMutation({
    mutationKey: [`remove-${url}`],
    mutationFn: (id: string) =>
      api.delete<string, TOrderItemInstanceData>(`${url}/${id}`),
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: [`get-all-${url}`] }),
  });

  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      <FlexListContainer>
        <OrderItemCardAdder onAdd={addOrderItem} />
        {orderItems?.map((orderItem) => (
          <OrderItemCardEditable
            key={orderItem._id}
            _id={orderItem._id}
            name={orderItem.name}
            image={orderItem.image}
            description={orderItem.description}
            price={orderItem.price}
            onRemove={removeOrderItem}
            onUpdate={updateOrderItem}
            isRemoving={isRemoving}
          />
        ))}
      </FlexListContainer>
    </AsyncComponent>
  );
}

export default AdminOrderItemsList;
