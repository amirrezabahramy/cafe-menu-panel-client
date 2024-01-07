import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";

import bgLoginLight from "@/assets/images/backgrounds/bg-login-light.jpg";

const mode =
  JSON.parse(typedLocalStorage.getItem("localConfig") || "null")?.mode ||
  "light";

const body = document.getElementsByTagName("body").item(0);
if (body) {
  body.classList.add(mode);
}

export const fonts = {
  irRegular: "IRRegular",
  irBold: "IRBold",
};
export const boxShadows = {
  medium: "4px 4px 4px rgba(132, 132, 132, 0.2)",
};

export const backgroundImages = {
  bgLogin: {
    light: {
      backgroundImage: `url(${bgLoginLight})`,
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    dark: {
      backgroundImage: `url(${bgLoginLight})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  },
  bgPanel: {
    light: {},
    dark: {},
  },
};
