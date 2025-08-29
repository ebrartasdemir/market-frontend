import { useState, useEffect } from "react";
import {
  Box, Grid, Typography, Divider, IconButton, Button, Menu, MenuItem,
  Drawer, useMediaQuery, Collapse
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import FiltersPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import { addToCart, getAllCategories, getAllProducts,getAllProductsByCategory } from "../api/ShopApi";

const MarketPage = () => {
  const isMdUp = useMediaQuery("(min-width:900px)");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // tek kategori id
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sortKey, setSortKey] = useState("featured");

  // Kategorileri çek
  
  useEffect(() => {
    if(localStorage.getItem("token")===""){
      window.location.href="/login";
    }
    const fetchCategories = async () => {
      try {
        setLoading(true);
    
        const res = await getAllCategories();
        setCategories(res); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
         if(activeCategory!=null){
          const res = await getAllProductsByCategory(activeCategory);
          setProducts(res);
        }
        else{
          const res = await getAllProducts();
          console.log(res);
          setProducts(res);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory, sortKey]);
  const handleAddToCart = async (productId) => {
    try {
      console.log("Adding to cart:", productId);
      await addToCart(productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
        <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: ".02em" }}>
          PRODUCTS
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, px: 5, color: "text.secondary", textAlign: "center" }}>
          Shop organic foods & wellness products that fly off our shelves—from full-spectrum sea moss to nutritional supplements.
        </Typography>
      </Box>

      {/* Filter & Sort */}
      <Box sx={{ borderTop: 1, borderColor: "divider", borderBottom: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1, px: 5 }}>
          <Button
            startIcon={<FilterListIcon />}
            endIcon={filtersOpen ? <ExpandLess /> : <ExpandMore />}
            onClick={() => (isMdUp ? setFiltersOpen(v => !v) : setDrawerOpen(true))}
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
            <MenuItem onClick={() => { setSortKey("featured"); setSortAnchor(null); }}>Featured</MenuItem>
            <MenuItem onClick={() => { setSortKey("price-asc"); setSortAnchor(null); }}>Price: Low to High</MenuItem>
            <MenuItem onClick={() => { setSortKey("price-desc"); setSortAnchor(null); }}>Price: High to Low</MenuItem>
            <MenuItem onClick={() => { setSortKey("title"); setSortAnchor(null); }}>Alphabetical</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{ py: 3, px: 2, display: "flex" }}>
        <Box sx={{ flexDirection:"row" }}>
        <Grid container spacing={2}>
          {isMdUp && (
            <Grid item xs={12} md={2}>
              <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
                <Box sx={{ pr: 2, borderRight: 1, borderColor: "divider" }}>
                  {Filters}
                </Box>
              </Collapse>
            </Grid>
          )}

          <Grid item xs={12} md={isMdUp ? 10 : 12}>
            <Grid container spacing={2}>
              {loading ? (
                <Typography sx={{ m: 2 }}>Loading...</Typography>
              ) : (
                products.map(p => (
                  <Grid item xs={6} 
                  sm={5} 
                  md={4}
                   lg={3} 
                   key={p.id}>
                    <ProductCard product={p} onAdd={handleAddToCart} />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
        </Box>
      </Box>

      {/* Mobil drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Filters</Typography>
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
