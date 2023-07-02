import useCurrentUser from "@/hooks/useCurrentUser";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";

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

  const menu = React.useMemo(() => {
    if (data?.role === Role.CUSTOMER)
      return [
        {
          title: "予約管理",
          onclick: () => {
            handleClose();
            router.push("/orders");
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

    if (data?.role === Role.STORE_MANAGER) {
      return [
        {
          title: "Store",
          onclick: () => {
            handleClose();
            router.push("/store");
          },
        },
        {
          title: "Orders",
          onclick: () => {
            handleClose();
            router.push("/store/orders");
          },
        },
        {
          title: "Logout",
          onclick: async () => {
            await signOut();
            handleClose();
            router.push("/");
          },
        },
      ];
    }
    return [];
  }, [data?.role, router]);

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
            sx={{
              display: "flex",
              mr: 1,
              userSelect: "none",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => router.push("/")}
          >
            🌸
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              userSelect: "none",
              ":hover": {
                cursor: "pointer",
              },
            }}
            fontWeight={700}
            fontSize={32}
            onClick={() => router.push("/")}
          >
            桜バイク
          </Typography>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : data ? (
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
