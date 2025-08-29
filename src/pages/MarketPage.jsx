import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";

import FiltersPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import {
  addToCart,
  getAllCategories,
  getAllProducts,
  getAllProductsByCategory,
} from "../api/ShopApi";

const MarketPage = () => {
  const isMdUp = useMediaQuery("(min-width:900px)");

  const [categories, setCategories] = useState([]);
  const [rawProducts, setRawProducts] = useState([]); // ham veri
  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const [sortAnchor, setSortAnchor] = useState(null);
  const [sortKey, setSortKey] = useState("featured"); // featured | price-asc | price-desc | title

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getAllCategories();
        setCategories(res || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Ürünleri çek (kategori veya sortKey değiştiğinde yenileriz)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res;
        if (activeCategory != null) {
          res = await getAllProductsByCategory(activeCategory);
        } else {
          res = await getAllProducts();
        }
        setRawProducts(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  // Basit client-side sıralama
  const products = useMemo(() => {
    const arr = [...rawProducts];
    switch (sortKey) {
      case "price-asc":
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "price-desc":
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "title":
        arr.sort((a, b) =>
          String(a.title || "").localeCompare(String(b.title || ""), undefined, { sensitivity: "base" })
        );
        break;
      case "featured":
      default:
        // API’den gelen sırayı koru veya isterseniz burada 'featured' mantığı kurun
        break;
    }
    return arr;
  }, [rawProducts, sortKey]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Sol filtre panelinin içeriği
  const Filters = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Product type
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <FiltersPanel
        options={categories}
        activeValue={activeCategory}
        onChange={setActiveCategory}
      />
    </Box>
  );

  return (
    <Box>
      {/* Başlık */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: ".02em", textAlign: "center" }}>
          PRODUCTS
        </Typography>
        <Typography
          variant="h6"
          sx={{ mt: 1, px: 5, color: "text.secondary", textAlign: "center" }}
        >
          Shop organic foods & wellness products that fly off our shelves—from
          full-spectrum sea moss to nutritional supplements.
        </Typography>
      </Box>

      {/* Filter & Sort bar */}
      <Box sx={{ borderTop: 1, borderColor: "divider", borderBottom: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1,
            px: 5,
            gap: 2,
          }}
        >
          <Button
            startIcon={<FilterListIcon />}
            endIcon={filtersOpen ? <ExpandLess /> : <ExpandMore />}
            onClick={() =>
              isMdUp ? setFiltersOpen((v) => !v) : setDrawerOpen(true)
            }
            sx={{ color: "text.primary", textTransform: "none", fontWeight: 600 }}
          >
            {isMdUp ? (filtersOpen ? "HIDE FILTERS" : "SHOW FILTERS") : "FILTERS"}
          </Button>

          <Button
            startIcon={<SortIcon />}
            endIcon={<ExpandMore />}
            onClick={(e) => setSortAnchor(e.currentTarget)}
            sx={{ color: "text.primary", textTransform: "none", fontWeight: 600 }}
          >
            SORT BY
          </Button>

          <Menu
            anchorEl={sortAnchor}
            open={Boolean(sortAnchor)}
            onClose={() => setSortAnchor(null)}
          >
            <MenuItem
              onClick={() => {
                setSortKey("featured");
                setSortAnchor(null);
              }}
            >
              Featured
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortKey("price-asc");
                setSortAnchor(null);
              }}
            >
              Price: Low to High
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortKey("price-desc");
                setSortAnchor(null);
              }}
            >
              Price: High to Low
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSortKey("title");
                setSortAnchor(null);
              }}
            >
              Alphabetical
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* İçerik: Sol filtre (md+) + Sağ ürünler */}
      <Box sx={{ px: 2, py: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Sol: Filtre paneli (md ve üzeri görünür) */}
          {isMdUp && filtersOpen && (
            <Box
              sx={{
                width: 280,
                flexShrink: 0,
                position: "sticky",
                top: 88, // header yüksekliğinize göre ayarlayın
                alignSelf: "flex-start",
                borderRight: 1,
                borderColor: "divider",
              }}
            >
              {Filters}
            </Box>
          )}

          {/* Sağ: Ürün grid'i */}
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <Typography sx={{ m: 2 }}>Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                {products.map((p) => (
                  <Grid
                    item
                    key={p.id}
                    xs={12}   // mobil: 1 sütun
                    sm={6}    // küçük: 2 sütun
                    md={4}    // orta: 3 sütun
                    lg={3}    // büyük: 4 sütun
                  >
                    <ProductCard product={p} onAdd={handleAddToCart} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>

      {/* Mobil: Drawer filtreleri */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Filters
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ExpandLess />
          </IconButton>
        </Box>
        <Divider />
        {Filters}
      </Drawer>
    </Box>
  );
};

export default MarketPage;
