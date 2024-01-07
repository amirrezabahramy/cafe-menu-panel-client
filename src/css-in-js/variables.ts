const colorsObject = (light: string, main: string, dark: string) => ({
  light,
  main,
  dark,
});
export const palette = {
  common: {
    white: "#FAFAFA",
    black: "#18181B",
  },
  primary: colorsObject("#66AAF9", "#006FEE", "#004493"),
  secondary: colorsObject("#AE7EDE", "#7828C8", "#481878"),
  error: colorsObject("#F871A0", "#F31260", "#920B3A"),
  warning: colorsObject("#F9C97C", "#F5A524", "#936316"),
  info: colorsObject("#C3F4FD", "#7EE7FC", "#09AACD"),
  success: colorsObject("#74DFA2", "#17C964", "#0E793C"),
  // grey: colorsObject("#D4D4D8", "#71717A", "#3F3F46"),
};
