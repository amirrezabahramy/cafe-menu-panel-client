import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";
import bgLogin from "@/assets/images/backgrounds/bg-login.jpg";
import bgPanelLight from "@/assets/images/backgrounds/bg-panel-light.jpg";
import bgPanelDark from "@/assets/images/backgrounds/bg-panel-dark.jpg";
import { PaletteMode } from "@mui/material";

const mode: PaletteMode =
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
      backgroundImage: `linear-gradient(
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.15)
      ), url(${bgLogin})`,
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    dark: {
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.15),
        rgba(0, 0, 0, 0.15)
      ), url(${bgLogin})`,
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  },
  bgPanel: {
    light: {
      backgroundImage: `linear-gradient(
      rgba(255, 255, 255, 0.75),
      rgba(255, 255, 255, 0.75)
    ), url(${bgPanelLight})`,
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    dark: {
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.75)
    ), url(${bgPanelDark})`,
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  },
};
