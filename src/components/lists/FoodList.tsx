import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import AsyncComponent from "../generic/AsyncComponent";
import { AxiosError, AxiosResponse } from "axios";
import { TFood } from "@/types/models";
import OrderItemCard from "../generic/OrderItemCard";
import FlexListContainer from "../generic/FlexListContainer";

type TFoodData = AxiosResponse<Array<TFood>>;

function FoodList() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-food-list"],
    queryFn: () => api.get<undefined, TFoodData>("food"),
    select: (data) => data.data,
  });

  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      <FlexListContainer>
        {data?.map((food) => (
          <OrderItemCard
            key={food._id}
            name={food.name}
            image={food.image}
            description={food.description}
            price={food.price}
          />
        ))}
      </FlexListContainer>
    </AsyncComponent>
  );
}

export default FoodList;
