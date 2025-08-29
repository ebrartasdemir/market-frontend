import { List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function SidebarMenu({ active, onChange, onLogout }) {
  return (
    <List component="nav" disablePadding>
      <ListItemButton selected={active === "info"} onClick={() => onChange("info")}>
        <ListItemText primary="Information" />
      </ListItemButton>
      <ListItemButton selected={active === "orders"} onClick={() => onChange("orders")}>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <Divider sx={{ my: 0.5 }} />
      <ListItemButton onClick={onLogout}>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}
