import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { getProductById } from "../api/DetailApi";
import { addToCart } from "../api/ShopApi";

export default function DetailPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await getProductById(id);
        if (!alive) return;
        setProduct(data || null);
        setQty((q) => Math.min(Math.max(1, q), Math.max(1, Number(data?.quantity ?? 1))));
      } catch (e) {
        if (!alive) return;
        console.error("getProductById error:", e);
        setErr("Ürün yüklenirken bir hata oluştu.");
        setProduct(null);
      } finally {
        if (alive) setLoading(false);
      }
    };
    if (id) load();
    return () => {
      alive = false;
    };
  }, [id]);

  const stock = Number(product?.quantity ?? 0);
  const price = Number(product?.price ?? 0);

  const total = useMemo(() => (price * qty).toFixed(2), [price, qty]);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock > 0 ? stock : q + 1, q + 1));

  const canAdd = !loading && !!product && stock > 0 && qty >= 1 && qty <= stock;

  const addItemtoCart = async () => {
    if (!canAdd) return;
    try {
        await addToCart(product.id, qty);

    } catch (e) {
      console.error("addToCart error:", e);
    }
  };

  const imageSrc = useMemo(() => {
    const path = product?.imagePath;
    if (!path) return "";
    // URL ise direkt kullan
    if (/^https?:\/\//i.test(path) || path.startsWith("/")) return path;
    // Base64 ise data URL'e çevir
    // (Sunucudan mime türü gelmiyor; en güvenlisi jpeg varsaymak)
    return `data:image/jpeg;base64,${path}`;
  }, [product]);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
      {loading ? (
        <Typography color="text.secondary">Yükleniyor…</Typography>
      ) : err ? (
        <Typography color="error">{err}</Typography>
      ) : !product ? (
        <Typography color="text.secondary">Ürün bulunamadı.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={product.name}
              sx={{
                width: { xs: "100%", md: "50%" },
                borderRadius: 1,
                boxShadow: 1,
                maxHeight: 500,
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography variant="overline" sx={{ opacity: 0.7, mt:5}}>
                {product.categoryName || "Product"}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                {product.name}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h5">${price.toFixed(2)}</Typography>
                <Typography
                  variant="body2"
                  color={stock > 0 ? "success.main" : "error.main"}
                >
                  {stock > 0 ? `Stokta: ${stock} adet` : "Stokta yok"}
                </Typography>
              </Stack>

              {/* Quantity + Add to cart */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mb: 2 }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    p: 0.5,
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <IconButton size="small" onClick={dec} aria-label="decrease" disabled={qty <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      const clean = Number.isNaN(v) ? 1 : v;
                      const bounded = Math.min(Math.max(1, clean), Math.max(1, stock || 1));
                      setQty(bounded);
                    }}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: { textAlign: "center", width: 48 },
                    }}
                    variant="standard"
                  />
                  <IconButton
                    size="small"
                    onClick={inc}
                    aria-label="increase"
                    disabled={stock > 0 ? qty >= stock : false}
                  >
                    <AddIcon />
                  </IconButton>
                </Paper>

                <Button
                  onClick={addItemtoCart}
                  size="large"
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  disabled={!canAdd}
                  sx={{
                    flex: 1,
                    py: 1.2,
                    bgcolor: "black",
                    "&:hover": { bgcolor: "#222" },
                    textTransform: "uppercase",
                  }}
                >
                  {stock > 0 ? `ADD TO CART • $${total}` : "OUT OF STOCK"}
                </Button>
              </Stack>

              <Divider sx={{ mt: 2, mb: 7 }} />

              <Typography color="text.secondary" lineHeight={1.8}>
                {product.description}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
