type TBaseModel = {
  _id: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: "admin" | "customer";
} & TBaseModel;

export type TOrderItem = {
  name: string;
  image: string;
  description: string;
  price: number;
  type: "food" | "hot-drink" | "cold-drink";
} & TBaseModel;

export type TReview = {
  title: string;
  description: string;
} & TBaseModel;
