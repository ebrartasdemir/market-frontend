import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.password.length < 6)
      next.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirm)
      next.confirm = "Passwords do not match.";
    if (!form.terms) next.terms = "You must accept the Terms.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    // TODO: signup API çağrısı
    console.log("Signup:", form);
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
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
          maxWidth: 700,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600, letterSpacing: ".02em", mb: 1 }}>
          SIGN UP
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Sign in here
          </Link>
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Account created! You can sign in now.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: "left" }}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            name="confirm"
            type="password"
            fullWidth
            margin="normal"
            value={form.confirm}
            onChange={handleChange}
            error={!!errors.confirm}
            helperText={errors.confirm}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="terms"
                checked={form.terms}
                onChange={handleChange}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{" "}
                <Link href="/terms" underline="hover">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" underline="hover">
                  Privacy Policy
                </Link>
                .
              </Typography>
            }
            sx={{ mt: 1 }}
          />
          {errors.terms && (
            <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
              {errors.terms}
            </Typography>
          )}

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
            CREATE ACCOUNT
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 12, display: "block", mt: 3 }}
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
