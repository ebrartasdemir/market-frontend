import { Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function FiltersPanel({ options, activeSet, onChange }) {
  const toggle = (opt) => {
    const next = new Set(activeSet);
    next.has(opt) ? next.delete(opt) : next.add(opt);
    onChange(next);
  };

  return (
    <Box>
      <FormGroup>
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            control={
              <Checkbox
                size="small"
                checked={activeSet.has(opt)}
                onChange={() => toggle(opt)}
              />
            }
            label={opt}
            sx={{ "& .MuiFormControlLabel-label": { fontSize: 14 } }}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
