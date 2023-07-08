import useCurrentUser from "@/hooks/useCurrentUser";
import flowerLogo from "@/public/logo.png";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Skeleton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
            router.push(`/store/${data?.store.id}`);
          },
        },
        {
          title: "Orders",
          onclick: () => {
            handleClose();
            router.push(`/store/${data?.store.id}/orders`);
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
  }, [data?.role, data?.store?.id, router]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Thêm dòng này
          }}
        >
          <Box
            sx={{
              display: "column",
              alignItems: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => router.push("/")}
          >
            <Image
              src={flowerLogo}
              alt="Flower Logo"
              width={62}
              height={62}
              style={{
                userSelect: "none",
                marginLeft: "10px",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                userSelect: "none",
                marginLeft: "13px",
                marginBottom: "2px",
              }}
              fontWeight={900}
              fontSize={14}
              color="#ed1880"
            >
              桜バイク
            </Typography>
          </Box>
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
                    fontSize: 50,
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
                fontWeight: "bold",
                border: "4px solid lightpink",
                marginRight: "10px", // Border 2px, màu pink
                // backgroundColor: "lightpink", // Màu nền lightpink
                "&:hover": {
                  backgroundColor: "lightpink",
                },
              }}
              fontSize={24}
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
