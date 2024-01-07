import { typedLocalStorage } from "@/utils/helpers/typed-local-storage";
import { PaletteMode } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

// Types
type TProps = {
  children: React.ReactNode;
};

type TLocalConfig = {
  mode?: PaletteMode;
};

type TAddItems = (
  ...configEntries: Array<[keyof TLocalConfig, Valueof<TLocalConfig>]>
) => void;
type TGetItems = () => TLocalConfig;
type TRemoveItems = (...configKeys: Array<keyof TLocalConfig>) => void;
type TIsEmpty = () => boolean;
type TReset = () => void;

type TLocalConfigContext = {
  addItems: TAddItems;
  getItems: TGetItems;
  removeItems: TRemoveItems;
  isEmpty: TIsEmpty;
  reset: TReset;
};

// Context
const LocalConfigContext = createContext<TLocalConfigContext>({
  addItems: () => {},
  getItems: () => ({ mode: "light" }),
  isEmpty: () => true,
  removeItems: () => {},
  reset: () => {},
});

function LocalConfigProvider({ children }: TProps) {
  const [localConfig, setLocalConfig] = useState<TLocalConfig>(
    JSON.parse(typedLocalStorage.getItem("localConfig") || "null") || {
      mode: "light",
    }
  );

  const addItems: TAddItems = (...configEntries) => {
    const extend = Object.fromEntries(configEntries);
    setLocalConfig((prev) => ({
      ...prev,
      ...extend,
    }));
  };

  const getItems = (): TLocalConfig => localConfig;

  const removeItems: TRemoveItems = (...configKeys) => {
    setLocalConfig((prev) => {
      (Object.keys(prev) as Array<keyof TLocalConfig>).forEach((key) => {
        if (configKeys.includes(key)) {
          delete prev[key];
        }
      });
      return prev;
    });
  };

  const isEmpty: TIsEmpty = () => localConfig == null;

  const reset: TReset = () => {
    setLocalConfig({
      mode: "light",
    });
  };

  useEffect(() => {
    const addToLocalStorage = () => {
      if (localConfig) {
        typedLocalStorage.setItem("localConfig", JSON.stringify(localConfig));
      } else {
        typedLocalStorage.removeItem("localConfig");
      }
    };
    addToLocalStorage();
  }, [localConfig]);

  return (
    <LocalConfigContext.Provider
      value={{
        addItems,
        getItems,
        removeItems,
        isEmpty,
        reset,
      }}
    >
      {children}
    </LocalConfigContext.Provider>
  );
}

export function useLocalConfig() {
  return useContext(LocalConfigContext);
}

export default LocalConfigProvider;
