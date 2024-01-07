type TModelBase = {
  _id: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: "admin" | "customer";
} & TModelBase;

export type TColdDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TModelBase;

export type TFood = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TModelBase;

export type THotDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
} & TModelBase;

export type TReview = {
  title: string;
  description: string;
} & TModelBase;
