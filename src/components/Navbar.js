import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <div className="navbar">
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">
            <Link to="/" style={{ color: "white", marginRight: "20px" }}>
              Albums
            </Link>
          </Typography>
          <Typography variant="h6">
            <Link
              to="/create-album"
              style={{ color: "white", marginLeft: "20px" }}
            >
              Create an album
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
