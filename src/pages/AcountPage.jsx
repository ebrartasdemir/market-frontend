import { useEffect, useState } from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import InfoSection from "../components/InfoSection";
import OrdersSection from "../components/OrderSeciton";
import SidebarMenu from "../components/SideBar";
import UpdateUserDialog from "../components/UpdateUserDialog";
import { getActiveUser, getOrders, updateUser } from "../api/AccountApi";

export default function AccountPage() {
  const [active, setActive] = useState("info"); // "info" | "orders"
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await getActiveUser();
        setUser(u);
        setEditForm({
          name: u?.name ?? "",
          surname: u?.surname ?? "",
          email: u?.email ?? "",
          phone: u?.phone ?? "",
        });
      } catch (e) {
        console.error("getUser error:", e);
      } finally {
        setLoadingUser(false);
      }
    };

    const loadOrders = async () => {
      try {
        const o = await getOrders();
        setOrders(Array.isArray(o) ? o : []);
      } catch (e) {
        console.error("getOrders error:", e);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadUser();
    loadOrders();
  }, []);

  const handleOpenUpdate = () => {
    if (!user) return;
    setEditForm({
      name: user.name ?? "",
      surname: user.surname ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    });
    setUpdateOpen(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const updated = await updateUser(editForm);
      setUser(updated ?? editForm);
      setUpdateOpen(false);
    } catch (e) {
      console.error("updateUser error:", e);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
    } catch {}
    window.location.href = "/login";
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        My Account
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        {/* Sol içerik */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {active === "info" ? (
            <InfoSection
              user={user}
              loading={loadingUser}
              onOpenUpdate={handleOpenUpdate}
            />
          ) : (
            <OrdersSection orders={orders} loading={loadingOrders} />
          )}
        </Box>

        {/* Dikey Divider */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        {/* Sağ menü */}
        <Paper
          variant="outlined"
          sx={{
            width: { xs: "100%", md: 260 },
            position: { md: "sticky" },
            top: { md: 24 },
            p: 1,
          }}
        >
          <SidebarMenu
            active={active}
            onChange={(v) => setActive(v)}
            onLogout={handleLogout}
          />
        </Paper>
      </Box>

      {/* Update User Modal */}
      <UpdateUserDialog
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        form={editForm}
        setForm={setEditForm}
        onSave={handleSaveUpdate}
      />
    </Box>
  );
}
