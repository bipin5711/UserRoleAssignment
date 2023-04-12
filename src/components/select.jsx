import React from "react";
import "./textfield.css";
import {
  Typography,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function Select(props) {
  const { value, label, handleChange, options, error } = props;
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id={label}>{label}</InputLabel>
      <MuiSelect
        value={value}
        label={label}
        onChange={handleChange}
        labelId={label}
      >
        {options.map((option) => (
          <MenuItem value={option.roleKey}>{option.roleLabel}</MenuItem>
        ))}
      </MuiSelect>
      {error && <Typography className="error">{error}</Typography>}
    </FormControl>
  );
}
