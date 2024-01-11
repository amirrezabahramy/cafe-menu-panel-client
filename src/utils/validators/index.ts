import { z } from "zod";
import { REQUIRED, lengthError } from "./messages";

export const required = () => z.string().trim().min(1, REQUIRED);

export const nameValidator = () =>
  z.string().trim().min(4, lengthError("نام", 4, "min"));
export const descriptionValidator = () =>
  z.string().trim().min(10, lengthError("توضیحات", 10, "min"));
