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

export type TColdDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TBaseModel;

export type TFood = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TBaseModel;

export type THotDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TBaseModel;

export type TReview = {
  title: string;
  description: string;
} & TBaseModel;
