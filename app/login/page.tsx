"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  Button,
  FormControl,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { signIn } from "next-auth/react";
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

    const res = await signIn("credentials", {
      email: loginForm.email,
      password: loginForm.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(`ログインに失敗しました\n${res.error}`);
      return;
    }

    toast.success("ログインしました");
    router.push("/");
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Skeleton variant="rectangular" height={"100%"} />
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
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
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "40px 60px",
              gap: "20px",
              backgroundColor: "#fff",
              minWidth: "300px",
            }}
          >
            <Typography variant="h4" sx={{ paddingBottom: "16px" }}>
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
            <Button variant="contained" type="submit" fullWidth>
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
              アカウントをお持ちでない方は<Link href="/register">こちら</Link>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Login;
