import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AsyncComponent from "../generic/AsyncComponent";
import ReviewAccordion from "../generic/ReviewAccordion";
import { TReviewListData } from "@/types/queries/reviews";

function ReviewsList() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-reviews-list"],
    queryFn: () => api.get<void, TReviewListData>("reviews"),
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
