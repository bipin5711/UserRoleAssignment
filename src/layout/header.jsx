import React from "react";
import AppBar from "@mui/material/AppBar";
import logo from "../assets/logo.jpg";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const pages = [
    { title: "Users", url: "/users" },
    { title: "Roles", url: "/roles" },
  ];
  return (
    <AppBar position="static" className="appbar">
      <div className="header-row">
        <img src={logo} className="logo" alt="logo" />

        <div className="header-link">
          {pages.map((page) => (
            <Link className="header-title" key={page.title} to={page.url}>
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </AppBar>
  );
}
