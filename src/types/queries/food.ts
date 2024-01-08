import { AxiosResponse } from "axios";
import { TFood } from "../models";
import { QueryFunction, UseMutateAsyncFunction } from "@tanstack/react-query";
import { TPatchFood } from "../models/patch-models";

export type TFoodListData = AxiosResponse<Array<TFood>>;
export type TFoodInstanceData = AxiosResponse<TFood>;

export type TGetAllFoodMutate = QueryFunction<TFoodListData, Array<string>>;
export type TAddFoodMutate = UseMutateAsyncFunction<
  TFoodInstanceData,
  Error,
  TFood
>;
export type TUpdateFoodMutate = UseMutateAsyncFunction<
  TFoodInstanceData,
  Error,
  TPatchFood
>;
export type TRemoveFoodMutate = UseMutateAsyncFunction<
  TFoodInstanceData,
  Error,
  string
>;
