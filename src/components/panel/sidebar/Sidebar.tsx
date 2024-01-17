import { useSidebar } from "@/contexts/SidebarProvider";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import SidebarItemExpandable from "./SidebarItemExpandable";
import SidebarItem from "./SidebarItem";
import { TSidebarItems, panelDefaultOpacity } from "../Panel";
import { useAuth } from "@/contexts/AuthProvider";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { roles } from "@/utils/translations";
import { useTheme } from "@/contexts/ThemeProvider";

// Types
type TProps = {
  items: TSidebarItems;
};

export const sidebarWidth = 256;

function Sidebar({ items }: TProps) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { triggerManual } = useSnackbar();
  const { loggedInUser, logoutUser } = useAuth();
  const { colorByMode } = useTheme();

  const drawer = useMemo(
    () => (
      <>
        <Toolbar>
          <Avatar sx={{ mr: 1.25 }} />
          <Typography>
            {loggedInUser
              ? `${loggedInUser?.firstName} ${loggedInUser?.lastName} - ${
                  roles[loggedInUser?.role]
                }`
              : "کاربر مهمان"}
          </Typography>
        </Toolbar>
        <Divider />
        <List
          sx={{ my: 1 }}
          subheader={<ListSubheader>منوی اصلی</ListSubheader>}
        >
          {items.map((item, index) =>
            !!item.children ? (
              <SidebarItemExpandable
                key={index}
                icon={item.icon}
                text={item.text}
                route={item.route}
                children={item.children}
              />
            ) : item.route === "/auth/login" ? (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                route={item.route}
                onClick={() => {
                  logoutUser();
                  triggerManual("success", "موفق باشید.");
                }}
              />
            ) : (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                route={item.route}
              />
            )
          )}
        </List>
      </>
    ),
    []
  );

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: colorByMode(),
        width: { sm: sidebarWidth },
        flexShrink: { sm: 0 },
        opacity: panelDefaultOpacity,
      }}
    >
      <Drawer
        open={sidebarOpen}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
        onClose={(_, reason) => {
          reason === "backdropClick" && setSidebarOpen(false);
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        open
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
