import Navbar from "./Navbar";
import Sidebar from "./sidebar/Sidebar";
import Content from "./Content";
import SidebarProvider from "@/contexts/SidebarProvider";
import { Box } from "@mui/material";
import { backgroundImages } from "@/css-in-js/styles";
import { useTheme } from "@/contexts/ThemeProvider";

export type TSidebarItem = {
  icon: React.ReactNode;
  text: string;
  route: string;
  children?: Array<Omit<TSidebarItem, "children">>;
};

export type TSidebarItems = Array<TSidebarItem>;

type TProps = {
  sidebarItems: TSidebarItems;
};

export const panelDefaultOpacity = 0.9;

function Panel({ sidebarItems }: TProps) {
  const { mode } = useTheme();

  return (
    <Box sx={{ height: 1, ...backgroundImages.bgPanel[mode] }}>
      <SidebarProvider>
        <Navbar />
        <Sidebar items={sidebarItems} />
      </SidebarProvider>
      <Content />
    </Box>
  );
}

export default Panel;
