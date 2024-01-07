import api from "@/services/api";
import { TReview } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import AsyncComponent from "../generic/AsyncComponent";
import ReviewAccordion from "../generic/ReviewAccordion";

type TReviewsData = AxiosResponse<Array<TReview>>;

function ReviewsList() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-reviews-list"],
    queryFn: () => api.get<undefined, TReviewsData>("reviews"),
    select: (data) => data.data,
  });

  return (
    <AsyncComponent
      isLoading={isLoading}
      isError={isError}
      error={error as AxiosError}
    >
      {data?.map((review) => (
        <ReviewAccordion
          key={review._id}
          title={review.title}
          description={review.description}
        />
      ))}
    </AsyncComponent>
  );
}

export default ReviewsList;
