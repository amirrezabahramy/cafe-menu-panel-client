export type TUser = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: "admin" | "customer";
};

export type TColdDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
};

export type TFood = {
  name: string;
  image: string;
  description: string;
  price: number;
};

export type THotDrink = {
  name: string;
  image: string;
  description: string;
  price: number;
};

export type TReview = {
  title: string;
  description: string;
};
