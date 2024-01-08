import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { sidebarWidth } from "./Sidebar";
import { TSidebarItem } from "../Panel";
import { Link } from "@tanstack/react-router";

type TProps = Omit<TSidebarItem, "children"> & {
  onClick?: Function;
};

function SidebarItem({ icon, text, route, onClick }: TProps) {
  const isExitItem = route === "/auth/login";
  return (
    //@ts-ignore
    <ListItemButton
      sx={{ my: 0.75, minWidth: sidebarWidth }}
      onClick={isExitItem ? onClick : undefined}
      LinkComponent={isExitItem ? undefined : Link}
      to={isExitItem ? undefined : route}
    >
      <ListItemIcon sx={{ ml: 1 }}>{icon}</ListItemIcon>
      <ListItemText sx={{ mr: 1 }}>{text}</ListItemText>
    </ListItemButton>
  );
}

export default SidebarItem;
