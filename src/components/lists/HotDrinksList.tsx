import api from "@/services/api";
import { THotDrink } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import AsyncComponent from "../generic/AsyncComponent";
import OrderItemCard from "../generic/OrderItemCard";
import FlexListContainer from "../generic/FlexListContainer";

type THotDrinksData = AxiosResponse<Array<THotDrink>>;

function HotDrinksList() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-hot-drinks-list"],
    queryFn: () => api.get<undefined, THotDrinksData>("hot-drinks"),
    select: (data) => data.data,
  });

  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      <FlexListContainer>
        {data?.map((hotDrink) => (
          <OrderItemCard
            key={hotDrink._id}
            name={hotDrink.name}
            image={hotDrink.image}
            description={hotDrink.description}
            price={hotDrink.price}
          />
        ))}
      </FlexListContainer>
    </AsyncComponent>
  );
}

export default HotDrinksList;
