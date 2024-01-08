import { AxiosResponse } from "axios";
import { TOrderItem } from "../models";
import { QueryFunction, UseMutateAsyncFunction } from "@tanstack/react-query";
import { TPatchOrderItem } from "../models/patch-models";
import { TPostOrderItem } from "../models/post-models";

export type TOrderItemListData = AxiosResponse<Array<TOrderItem>>;
export type TOrderItemInstanceData = AxiosResponse<TOrderItem>;

export type TGetAllOrderItemMutate = QueryFunction<
  TOrderItemListData,
  Array<string>
>;
export type TAddOrderItemMutate = UseMutateAsyncFunction<
  TOrderItemInstanceData,
  Error,
  TPostOrderItem
>;
export type TUpdateOrderItemMutate = UseMutateAsyncFunction<
  TOrderItemInstanceData,
  Error,
  TPatchOrderItem
>;
export type TRemoveOrderItemMutate = UseMutateAsyncFunction<
  TOrderItemInstanceData,
  Error,
  string
>;
