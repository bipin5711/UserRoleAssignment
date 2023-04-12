import { Container } from "@mui/material";
import React from "react";
import Header from "./header";
import "./index.css";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container>
        <div className="content">{children}</div>
      </Container>
    </div>
  );
}
