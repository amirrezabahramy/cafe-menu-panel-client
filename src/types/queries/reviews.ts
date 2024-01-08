import { AxiosResponse } from "axios";
import { TReview } from "../models";
import { QueryFunction, UseMutateAsyncFunction } from "@tanstack/react-query";
import { TPostReview } from "../models/post-models";

export type TReviewListData = AxiosResponse<Array<TReview>>;
export type TReviewInstanceData = AxiosResponse<TReview>;

export type TGetAllReviewMutate = QueryFunction<TReviewListData, Array<string>>;
export type TAddReviewMutate = UseMutateAsyncFunction<
  TReviewInstanceData,
  Error,
  TPostReview
>;
export type TRemoveReviewMutate = UseMutateAsyncFunction<
  TReviewInstanceData,
  Error,
  string
>;
