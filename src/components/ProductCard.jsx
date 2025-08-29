import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({ product, onAdd }) {
  const goDetail = () => { window.location.href = `/detail/${product.id}`; };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        width: 200,
        position: "relative",
        "&:hover .overlay": { opacity: 1 },
        "&:hover .media": { transform: "scale(1.03)" },
        transition: "box-shadow .2s ease",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardActionArea
        component="div"
        disableRipple
        sx={{ cursor: "pointer" }}
        onClick={goDetail}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={product.imagePath}
            alt={product.title}
            className="media"
            sx={{
              width: "100%",
              aspectRatio: "4 / 3",
              objectFit: "contain",
              transition: "transform .25s ease",
            }}
          />

          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pb: 1.5,
              opacity: 0,
              transition: "opacity .2s ease",
              pointerEvents: "none", 
            }}
          >
            <Button
              size="small"
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={(e) => {
                e.stopPropagation(); 
                onAdd?.(product.id);
              }}
              sx={{ pointerEvents: "auto",
                bgcolor: "black",
                "&:hover": { bgcolor: "#222" }
               }} 
            >
              Add to cart
            </Button>
          </Box>
        </Box>

        <CardContent sx={{ textAlign: "center", py: 1.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2, minHeight: 38, mb: 0.5 }}>
            {product.title}
          </Typography>
          <Typography variant="body2">${product.price.toFixed(2)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
