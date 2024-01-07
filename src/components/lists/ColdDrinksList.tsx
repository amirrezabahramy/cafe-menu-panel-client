import api from "@/services/api";
import { TColdDrink } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import AsyncComponent from "../generic/AsyncComponent";
import OrderItemCard from "../generic/OrderItemCard";
import FlexListContainer from "../generic/FlexListContainer";

type TColdDrinksData = AxiosResponse<Array<TColdDrink>>;

function ColdDrinksList() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-cold-drinks-list"],
    queryFn: () => api.get<undefined, TColdDrinksData>("cold-drinks"),
    select: (data) => data.data,
  });

  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      <FlexListContainer>
        {data?.map((coldDrink) => (
          <OrderItemCard
            key={coldDrink._id}
            name={coldDrink.name}
            image={coldDrink.image}
            description={coldDrink.description}
            price={coldDrink.price}
          />
        ))}
      </FlexListContainer>
    </AsyncComponent>
  );
}

export default ColdDrinksList;
