import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { signOut } from "next-auth/react";

export default function Header() {
  const { data, isLoading } = useCurrentUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const menu = [
    {
      title: "プロフィール",
      onclick: () => {
        handleClose();
        router.push("/profile");
      },
    },
    {
      title: "ログアウト",
      onclick: async () => {
        await signOut();
        handleClose();
        router.push("/");
      },
    },
  ];

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
          {data && !isLoading ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle
                  sx={{
                    fontSize: 40,
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={handleClose}
                open={Boolean(anchorEl)}
                sx={{ mt: "45px" }}
              >
                {menu.map((item) => {
                  return (
                    <MenuItem
                      key={`menu-item-${item.title}`}
                      onClick={() => {
                        item.onclick();
                      }}
                    >
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          ) : (
            <Button
              color="inherit"
              sx={{
                fontWeight: 700,
              }}
              onClick={() => router.push("/login")}
            >
              ログイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
