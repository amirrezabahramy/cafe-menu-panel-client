export const REQUIRED = "فیلد الزامی";

export const lengthError = (
  fieldName: string,
  length: number,
  mode: "min" | "max"
) =>
  `${fieldName} باید شامل ${
    mode === "min" ? "حداقل" : "حداکثر"
  } ${length} کاراتر باشد.`;
