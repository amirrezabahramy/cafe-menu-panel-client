import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type TProps = {
  children: React.ReactNode;
};

type TExpandItemKey = string | -1;

type TSidebarContext = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  expandedItemKey: TExpandItemKey;
  setExpandedItemKey: Dispatch<SetStateAction<TExpandItemKey>>;
};

const SidebarContext = createContext<TSidebarContext>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  expandedItemKey: -1,
  setExpandedItemKey: () => {},
});

function SidebarProvider({ children }: TProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [expandedItemKey, setExpandedItemKey] = useState<TExpandItemKey>(-1);

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        expandedItemKey,
        setExpandedItemKey,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

export default SidebarProvider;
