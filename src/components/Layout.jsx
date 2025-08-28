import { Container, Box } from "@mui/material";
import AppBar from "./NavBar";
export default function Layout({ children }) {
  return (
    <Box>
      <AppBar />
      <Box sx={{ mt: 4 }}>{children}</Box>
    </Box>
  );
}
