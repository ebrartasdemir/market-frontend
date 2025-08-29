import { useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, Divider, Stack,
  List, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails,
  Chip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// --- Mock user & orders ---
const initialUser = {
  name: "Ada Lovelace",
  email: "ada@example.com",
};

const mockOrders = [
  {
    id: "ORD-10023",
    date: "2025-03-01",
    status: "Shipped",
    total: 62.0,
    address: {
      fullName: "Ada Lovelace",
      country: "Türkiye",
      city: "İstanbul",
      district: "Kadıköy",
      address1: "Moda Cad. No:7",
      zip: "34710",
      phone: "+90 555 555 55 55",
    },
    items: [
      { id: 1, title: "Buffalo Cauliflower Popcorn", qty: 2, price: 9, img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=200" },
      { id: 2, title: "Spring Water - 24 Pack", qty: 1, price: 44, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=200" },
    ],
  },
  {
    id: "ORD-10012",
    date: "2025-02-18",
    status: "Delivered",
    total: 30.0,
    address: {
      fullName: "Ada Lovelace",
      country: "Türkiye",
      city: "İstanbul",
      district: "Üsküdar",
      address1: "Çengelköy Mah. No:4",
      zip: "34680",
      phone: "+90 555 555 55 55",
    },
    items: [
      { id: 3, title: "Washable Kraft Bag", qty: 1, price: 30, img: "https://images.unsplash.com/photo-1555529771-35a38fb5a02b?q=80&w=200" },
    ],
  },
];

export default function AccountPage() {
  const [active, setActive] = useState("info"); // "info" | "orders"
  const [user, setUser] = useState(initialUser);
  const [pw, setPw] = useState({ password: "", confirm: "" });
  const [orders] = useState(mockOrders);

  const saveInfo = () => {
    if (pw.password && pw.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (pw.password && pw.password !== pw.confirm) {
      alert("Passwords do not match.");
      return;
    }
    // TODO: API'ye gönder
    console.log("Saved profile:", { user, newPassword: pw.password || undefined });
    alert("Information updated (mock).");
    setPw({ password: "", confirm: "" });
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
        {/* Sol içerik: active'e göre değişir */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {active === "info" ? (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Information</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  fullWidth
                />
                <Divider />
                <Typography variant="subtitle1">Change Password</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="New password"
                    type="password"
                    value={pw.password}
                    onChange={(e) => setPw({ ...pw, password: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Confirm password"
                    type="password"
                    value={pw.confirm}
                    onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                    fullWidth
                  />
                </Stack>

                <Button
                  variant="contained"
                  onClick={saveInfo}
                  sx={{ alignSelf: "flex-start", bgcolor: "black", "&:hover": { bgcolor: "#222" } }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Paper>
          ) : (
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Orders</Typography>
              <Stack spacing={1.5}>
                {orders.map((o) => (
                  <Accordion key={o.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: "100%" }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{o.id}</Typography>
                          <Typography variant="body2" color="text.secondary">{o.date}</Typography>
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Chip label={o.status} size="small" color={o.status === "Delivered" ? "success" : "primary"} />
                          <Typography sx={{ minWidth: 90, textAlign: "right" }}>
                            ${o.total.toFixed(2)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 3,
    }}
  >
    {/* Adres */}
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 ,fontWeight: 600 }}>
        Shipping Address
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {o.address.fullName}<br />
        {o.address.address1}<br />
        {o.address.district}, {o.address.city} {o.address.zip}<br />
        {o.address.country}<br />
        {o.address.phone}
      </Typography>
    </Box>
 <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
    {/* Items */}
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
        Items
      </Typography>
            <Divider sx={{ mb: 1 }} />

      <Stack spacing={1}>
        {o.items.map((it) => (
          <Stack
            key={it.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Box
              component="img"
              src={it.img}
              alt={it.title}
              sx={{ width: 56, height: 56, borderRadius: 1, objectFit: "cover" }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography noWrap>{it.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Qty: {it.qty}
              </Typography>
            </Box>
            <Typography>${(it.qty * it.price).toFixed(2)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  </Box>
</AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Paper>
          )}
        </Box>

        {/* Dikey Divider (sadece md+) */}
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
          {/* Mobilde yatay menü gibi görünmesi için List yerine Stack kullanılabilir.
              Ama basit tutuyoruz. */}
          <List component="nav" disablePadding>
            <ListItemButton
              selected={active === "info"}
              onClick={() => setActive("info")}
            >
              <ListItemText primary="Information" />
            </ListItemButton>
            <ListItemButton
              selected={active === "orders"}
              onClick={() => setActive("orders")}
            >
              <ListItemText primary="Orders" />
            </ListItemButton>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}
