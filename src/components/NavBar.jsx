import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const mainLinks = [
  { label: "Shop", to: "/" },
];

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 3 }}>
          {mainLinks.map((link) => (
            <Button key={link.to} href={link.to} sx={{ color: "text.primary" }}>
              {link.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: "flex", lg: "none" } }}>
          <IconButton onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {mainLinks.map((link) => (
              <MenuItem
                key={link.to}
                onClick={handleCloseNavMenu}
                href={link.to}
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".3em",
            color: "inherit",
            textDecoration: "none",
          }}
          onClick={() => (window.location.href = "/")}
        >
          MARKET
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => (localStorage.getItem("token") === "" ? window.location.href = "/login" : window.location.href = "/account")}
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton onClick={() => (window.location.href = "/cart")}>
            <ShoppingBagIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
