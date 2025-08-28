import { useMemo, useState } from "react";
import {
  Box, Container, Grid, Typography, Divider, IconButton, Button, Menu, MenuItem,
  Drawer, useMediaQuery, Collapse
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import FiltersPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
const ALL_PRODUCTS = [
  {
    id: 1,
    title: "Erewhon Clear Bag",
    price: 80,
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    types: ["Bags"]
  },
  {
    id: 2,
    title: "Liposomal Glutathione | Citrus Zest (25 ct)",
    price: 88,
    img: "https://images.unsplash.com/photo-1608200185943-c6118e03223b?q=80&w=1200&auto=format&fit=crop",
    types: ["Vitamins"]
  },
  {
    id: 3,
    title: "Spring Water - 24 Pack (16 oz)",
    price: 80,
    img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1200&auto=format&fit=crop",
    types: ["Beverages"]
  },
  {
    id: 4,
    title: "Buffalo Cauliflower Popcorn",
    price: 9,
    img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    types: ["Snacks"]
  },
  {
    id: 5,
    title: "Washable Kraft Bag",
    price: 30,
    img: "https://images.unsplash.com/photo-1555529771-35a38fb5a02b?q=80&w=1200&auto=format&fit=crop",
    types: ["Bags"]
  },
];

const PRODUCT_TYPES = [
  "Almonds",
  "Aromatherapy",
  "Bath & Body",
  "Beverages",
  "Candles",
  "Candy & Chocolate",
  "Carafe",
  "Caviar",
  "Children's, Immunity, Multi-Vitamins",
  "Snacks",
  "Bags",
  "Vitamins",
];
const MarketPage = () => {
   const isMdUp = useMediaQuery("(min-width:900px)");
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sortKey, setSortKey] = useState("featured"); // featured | price-asc | price-desc | title

  const filtered = useMemo(() => {
    let arr = [...ALL_PRODUCTS];
    if (activeTypes.size > 0) {
      arr = arr.filter(p => p.types.some(t => activeTypes.has(t)));
    }
    switch (sortKey) {
      case "price-asc":  arr.sort((a,b) => a.price - b.price); break;
      case "price-desc": arr.sort((a,b) => b.price - a.price); break;
      case "title":      arr.sort((a,b) => a.title.localeCompare(b.title)); break;
      default: break;
    }
    return arr;
  }, [activeTypes, sortKey]);

  const Filters = (
    <Box sx={{ width: 280, p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Product type
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <FiltersPanel
        options={PRODUCT_TYPES}
        activeSet={activeTypes}
        onChange={setActiveTypes}
      />
    </Box>
  );

    
  return (
    <Box sx={{  }}>
      <Box  sx={{ py: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: ".02em" }}>
          BEST SELLERS
        </Typography>
        <Typography variant="h6" sx={{ mt: 1,px:55, color: "text.secondary", justifyContent: "center" }}>
          Shop organic foods & wellness products that fly off our shelves—from full-spectrum sea moss to nutritional supplements.
        </Typography>
      </Box>

      <Box sx={{ borderTop: 1, borderColor: "divider", borderBottom: 1 }}>
        <Box>
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
      </Box>

    <Box sx={{ py: 3, px: 2,display:"flex" }}>
      <Box sx={{flexDirection:"row"}}>
  <Grid container spacing={2}>
    {/* Sol filtre */}
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
        {filtered.map((p) => (
          <Grid
            key={p.id}
            item
            xs={6}   // telefonda 2 sütun
            sm={5}   // küçük ekran 3 sütun
            md={4}   // orta ekran 4 sütun
            lg={3}   // büyük ekran 6 sütun
          >
            <ProductCard product={p}  />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
  </Box>
</Box>
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