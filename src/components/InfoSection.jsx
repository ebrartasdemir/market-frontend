import { Paper, Typography, Stack, TextField, Button } from "@mui/material";

export default function InfoSection({ user, loading, onOpenUpdate }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Information
      </Typography>

      {loading ? (
        <Typography color="text.secondary">Loading...</Typography>
      ) : !user ? (
        <Typography color="error">User not found.</Typography>
      ) : (
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField label="Name" value={user.name ?? ""} fullWidth InputProps={{ readOnly: true }} />
            <TextField label="Surname" value={user.surname ?? ""} fullWidth InputProps={{ readOnly: true }} />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField label="Email" value={user.email ?? ""} fullWidth InputProps={{ readOnly: true }} />
            <TextField label="Phone" value={user.phone ?? ""} fullWidth InputProps={{ readOnly: true }} />
          </Stack>
          <Button
            variant="contained"
            onClick={onOpenUpdate}
            sx={{ alignSelf: "flex-start", bgcolor: "black", "&:hover": { bgcolor: "#222" } }}
          >
            Update User
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
