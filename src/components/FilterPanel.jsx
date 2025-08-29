import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function FiltersPanel({ options = [], activeValue, onChange }) {
  return (
    <Box>
      <RadioGroup
        value={activeValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.id}
            value={opt.id}
            control={<Radio size="small" />}
            label={opt.name}
            sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
