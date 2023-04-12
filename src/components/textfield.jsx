import React from "react";
import { TextField as MuiTextField, Typography } from "@mui/material";
import "./textfield.css";

export default function TextField({
  name,
  value,
  label,
  setFieldValue,
  error,
  ...rest
}) {
  const handleChange = (val) => {
    setFieldValue(name, val);
  };
  return (
    <div>
      <MuiTextField
        name={name}
        label={label}
        variant="outlined"
        className="textfield"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        {...rest}
      />
      {error && <Typography className="error">{error}</Typography>}
    </div>
  );
}
