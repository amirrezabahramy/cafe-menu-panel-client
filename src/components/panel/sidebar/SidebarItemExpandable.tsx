import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { sidebarWidth } from "./Sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSidebar } from "@/contexts/SidebarProvider";
import { TSidebarItem } from "../Panel";

type TProps = TSidebarItem;

function SidebarItemExpandable({ icon, text, route, children }: TProps) {
  const { expandedItemKey, setExpandedItemKey } = useSidebar();
  const open = expandedItemKey === route;

  const handleClick = () => {
    open ? setExpandedItemKey(-1) : setExpandedItemKey(route);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{ my: 0.75, minWidth: sidebarWidth }}
      >
        <ListItemIcon sx={{ ml: 1 }}>{icon}</ListItemIcon>
        <ListItemText sx={{ mr: 1 }}>{text}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {children?.map((child, index) => (
            //@ts-ignore
            <ListItemButton
              key={index}
              LinkComponent={Link}
              sx={{ pl: 4 }}
              to={`${route}/${child.route}`}
            >
              <ListItemIcon>{child.icon}</ListItemIcon>
              <ListItemText>{child.text}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemExpandable;
