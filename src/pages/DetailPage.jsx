import { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const product = {
  id: 101,
  title: "Cooler Bag | Brown",
  price: 120.0,
  img: "https://cdn.pixabay.com/photo/2016/11/23/18/12/bag-1854148_1280.jpg",
  description:
    "The Erewhon insulated cooler bag in brown is crafted from 100% organic cotton, sustainably dyed and wax-coated for water repellence. Handcrafted with care, this bag is perfect for your daily essentials.",
};

export default function DetailPage() {
  const [qty, setQty] = useState(1);
  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);
  const addToCart = () =>
    console.log("Added to cart:", { id: product.id, qty });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 6 } }}>
      {/* Wrapper: solda resim - sağda içerik */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* Sol: ürün resmi */}
        <Box
          component="img"
          src={product.img}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: "50%" },
            borderRadius: 1,
            boxShadow: 1,
            objectFit: "cover",
          }}
        />

        {/* Sağ: bilgiler */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 5 }}>
            {product.title}
          </Typography>
          <Typography variant="h5" sx={{ mb: 5 }}>
            ${product.price.toFixed(2)}
          </Typography>

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
              <IconButton size="small" onClick={dec} aria-label="decrease">
                <RemoveIcon />
              </IconButton>
              <TextField
                value={qty}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setQty(Number.isNaN(v) ? 1 : Math.max(1, v));
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  style: { textAlign: "center", width: 48 },
                }}
                variant="standard"
              />
              <IconButton size="small" onClick={inc} aria-label="increase">
                <AddIcon />
              </IconButton>
            </Paper>

            <Button
              onClick={addToCart}
              size="large"
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                flex: 1,
                py: 1.2,
                bgcolor: "black",
                "&:hover": { bgcolor: "#222" },
                textTransform: "uppercase",
              }}
            >
              ADD TO CART • ${(product.price * qty).toFixed(2)}
            </Button>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography color="text.secondary" lineHeight={1.8}>
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
