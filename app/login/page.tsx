"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import defaultBike from "@/public/default-bike.jpg";
import flowerLogo from "@/public/logo.png";
import {
  Button,
  FormControl,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: loginForm.email,
        password: loginForm.password,
        redirect: false,
      });

      if (!res?.error) {
        toast.success("ログインしました");
        router.push("/");
      } else {
        toast.error(`ログインに失敗しました\n${res.error}`);
      }
    } catch (error) {
      toast.error(
        `ログインに失敗しました\nパスワードとユーザー名を再確認してください`
      );
    }
  };

  return (
    <>
      {/* <Header /> */}
      {isLoading ? (
        <Skeleton variant="rectangular" height={"100%"} />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex",
            backgroundColor: "#fff",
            minHeight: "100vh",
            minWidth: "-webkit-fill-available",
          }}
        >
          <Grid container spacing={7}>
            <Grid
              item
              sx={{
                marginTop: "20px",
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
                  width={120}
                  height={120}
                  style={{
                    userSelect: "none",
                    marginLeft: "100px",
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    userSelect: "none",
                    marginLeft: "106px",
                    marginBottom: "100px",
                  }}
                  fontWeight={700}
                  fontSize={28}
                  color="#ed1880"
                >
                  桜バイク
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                marginTop: "200px",
              }}
            >
              <Image
                src={defaultBike}
                alt="Default Bike"
                height={240}
                width={320}
                style={{
                  userSelect: "none",
                }}
              />
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  padding: "40px 60px",
                  gap: "20px",
                  backgroundColor: "#fff",
                  minWidth: "300px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ paddingBottom: "16px" }}
                  fontWeight={900}
                >
                  ログイン
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    name="email"
                    value={loginForm.email}
                    type="text"
                    label="メール"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="password"
                    value={loginForm.password}
                    type="password"
                    label="パスワード"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: "lightpink",
                    ":hover": {
                      backgroundColor: "#f399b5",
                    },
                  }}
                >
                  ログイン
                </Button>
                <Box
                  component={"div"}
                  sx={{
                    fontSize: "14px",
                    color: "#606063",
                    "& a": {
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#0962e7",
                    },
                  }}
                >
                  アカウントをお持ちでない方は
                  <Link href="/register">こちら</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Login;
