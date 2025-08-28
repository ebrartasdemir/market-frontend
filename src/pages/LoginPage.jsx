import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
} from "@mui/material";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", form);
    // TODO: login API çağrısı
  };

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
          maxWidth:700,
          textAlign: "center",
        }}
      >
        {/* Başlık */}
             <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: ".02em", mb: 1 }}>

          LOGIN
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" underline="hover">
            Sign up here
          </Link>
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "left" }}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "black",
              "&:hover": { bgcolor: "#333" },
              py: 1,
            }}
          >
            SIGN IN
          </Button>
        </Box>

        {/* Alt linkler */}
      
        <Divider sx={{ my: 3 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 12 }}
        >
          This site is protected by hCaptcha and the hCaptcha{" "}
          <Link href="https://hcaptcha.com/privacy" target="_blank">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="https://hcaptcha.com/terms" target="_blank">
            Terms of Service
          </Link>{" "}
          apply.
        </Typography>
      </Box>
    </Box>
  );
}
