import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            fontSize={48}
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            🌸
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            fontWeight={700}
            fontSize={32}
          >
            桜バイク
          </Typography>
          <Button
            color="inherit"
            sx={{
              fontWeight: 700,
            }}
          >
            ログイン
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
