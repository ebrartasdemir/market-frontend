import { useMemo, useState, useEffect } from "react";
import {
  Box, Paper, Typography, TextField, Button, Divider, Stack,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getAllAddresses, getCartItems, addAddress, addOrder } from "../api/CartApi";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  // Sepet
  const [cart, setCart] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressFormOpen, setAddressFormOpen] = useState(true);

  const [address, setAddress] = useState({
    id: 0,
    title: "",
    city: "",
    district: "",
    avunue: "",
    street: "",
    eno: 0,
    ino: 0,
  });

  const [card, setCard] = useState({ name: "", number: "", exp: "", cvc: "" });

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart]
  );

  const isCartEmpty = cart.length === 0;

  const updateCartQty = (id, quantity) =>
    setCart((c) =>
      c.map((i) => (i.id === id ? { ...i, quantity } : i))
    );

  const removeCartItem = (id) =>
    setCart((c) => c.filter((i) => i.id !== id));

  const handleUseExisting = (id) => {
    setSelectedAddressId(id);
    const found = savedAddresses.find((a) => a.id === id);
    if (found) {
      setAddress(found);
      setAddressFormOpen(false);
    }
  };

  const handleAddNewAddress = () => {
    setSelectedAddressId("");
    setAddress({
      id: 0,
      title: "",
      city: "",
      district: "",
      avunue: "",
      street: "",
      eno: 0,
      ino: 0,
    });
    setAddressFormOpen(true);
  };

  const addressValid =
    address.title &&
    address.city &&
    address.district &&
    address.avunue &&
    address.street &&
    address.eno &&
    address.ino;

  const cardValid =
    card.name &&
    /^\d{12,19}$/.test(card.number.replace(/\s+/g, "")) &&
    /^\d{2}\/\d{2}$/.test(card.exp) &&
    /^\d{3,4}$/.test(card.cvc);

  const canPlaceOrder =
     addressValid && cardValid && cart.length > 0;

  const placeOrder = async () => {
    if (!canPlaceOrder) return;

    const orderPayload = {
      adressId: address.id,
    };

    try {
      await addOrder(orderPayload);
      toast.success("Sipariş başarıyla oluşturuldu!");
      setCart([]); // sepeti boşalt
      window.location.href = "/account"; 
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Sipariş oluşturulurken hata oluştu");
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await getAllAddresses();
        setSavedAddresses(res || []);
        console.log(res);
        if (res && res.length > 0) {
          setSelectedAddressId(res[0].id);
          setAddress(res[0]);
          setAddressFormOpen(false);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setSavedAddresses([]);
      }
    };

    const fetchCartItems = async () => {
      try {
        const res = await getCartItems();
        setCart(res || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCart([]);
      }
    };

    fetchAddresses();
    fetchCartItems();
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        justifyContent: "center",
      }}
    >
      {/* Sol taraf */}
      <Box>
        <Divider sx={{ my: 2 }}>ORDER INFORMATION</Divider>

        {/* Sepet boş görünümü */}
        {isCartEmpty && (
          <Paper variant="outlined" sx={{ p: 3, textAlign: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Cart is empty.
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Click the button below to continue shopping
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/"
              sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "#222" } }}
            >
              Shop for more
            </Button>
          </Paper>
        )}

        {!isCartEmpty && (
          <>
            {/* Delivery */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Delivery
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              {savedAddresses.length > 0 && (
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ mb: 2 }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="addr-select">Saved addresses</InputLabel>
                    <Select
                      labelId="addr-select"
                      value={selectedAddressId}
                      onChange={(e) => handleUseExisting(Number(e.target.value))}
                    >
                      {savedAddresses.map((a) => (
                        <MenuItem key={a.id} value={a.id}>
                          {a.title} — {a.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="outlined" onClick={handleAddNewAddress}>
                    Add New Address
                  </Button>
                </Stack>
              )}

              {(addressFormOpen || !savedAddresses.length) && (
                <Stack spacing={1.5}>
                  <TextField
                    label="Title"
                    value={address.title}
                    onChange={(e) =>
                      setAddress({ ...address, title: e.target.value })
                    }
                  />
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="City"
                      fullWidth
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                    />
                    <TextField
                      label="District"
                      fullWidth
                      value={address.district}
                      onChange={(e) =>
                        setAddress({ ...address, district: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="Avenue"
                      fullWidth
                      value={address.avunue}
                      onChange={(e) =>
                        setAddress({ ...address, avunue: e.target.value })
                      }
                    />
                    <TextField
                      label="Street"
                      fullWidth
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      label="External Door Number"
                      fullWidth
                      value={address.eno}
                      onChange={(e) =>
                        setAddress({ ...address, eno: Number(e.target.value) })
                      }
                    />
                    <TextField
                      label="Internal Door Number"
                      fullWidth
                      value={address.ino}
                      onChange={(e) =>
                        setAddress({ ...address, ino: Number(e.target.value) })
                      }
                    />
                  </Stack>
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      const newAddr = { ...address, id: Date.now() }; // int id
                      await addAddress(newAddr);
                      toast.success("Address added successfully");
                      setSavedAddresses((s) => [...s, newAddr]);
                      setSelectedAddressId(newAddr.id);
                      setAddressFormOpen(false);
                    }}
                    disabled={!addressValid}
                  >
                    Save and use this address
                  </Button>
                </Stack>
              )}
            </Paper>

            {/* Payment */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Payment
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <TextField
                label="Name on card"
                fullWidth
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                sx={{ mb: 1.5 }}
              />
              <TextField
                label="Card number"
                fullWidth
                value={card.number}
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value.replace(/\s/g, "") })
                }
                placeholder="4242 4242 4242 4242"
                sx={{ mb: 1.5 }}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  label="Expiry (MM/YY)"
                  value={card.exp}
                  onChange={(e) => setCard({ ...card, exp: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="CVC"
                  value={card.cvc}
                  onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                  fullWidth
                />
              </Stack>
            </Paper>

            <Button
              variant="contained"
              size="large"
              onClick={placeOrder}
              disabled={!canPlaceOrder}
              sx={{ bgcolor: "black", "&:hover": { bgcolor: "#222" } }}
            >
              MAKE AN ORDER • ${subtotal.toFixed(2)}
            </Button>
          </>
        )}
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" } }}
      />

      {/* Sağ taraf */}
      <Box sx={{ width: { xs: "100%", md: 350 } }}>
        <Paper
          variant="outlined"
          sx={{ p: 2, position: { md: "sticky" }, top: { md: 24 } }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            {isCartEmpty ? (
              <Typography color="text.secondary">
                No items in cart
              </Typography>
            ) : (
              cart.map((it) => (
                <Stack
                  key={it.id}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{it.productName}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      <TextField
                        size="small"
                        value={it.quantity}
                        onChange={(e) =>
                          updateCartQty(
                            it.id,
                            Math.max(1, parseInt(e.target.value || "1", 10))
                          )
                        }
                        sx={{ width: 72 }}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        × ${it.price.toFixed(2)}
                      </Typography>
                    </Stack>
                  </Box>
                  <Typography>${(it.quantity * it.price).toFixed(2)}</Typography>
                  <Button
                    color="error"
                    onClick={() => removeCartItem(it.id)}
                  >
                    Sil
                  </Button>
                </Stack>
              ))
            )}
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h5">${subtotal.toFixed(2)}</Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
