"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Role } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type RegisterForm = {
  email: string;
  username: string;
  password: string;
  role: Role;
};

const Register = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
    role: Role.CUSTOMER,
  });

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post("/api/register", registerForm);

    if (res?.status !== 200) {
      toast.error(`サインアップに失敗しました\n${res.statusText}`);
      return;
    }

    toast.success("サインアップしました");
    router.push("/login");
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
              サインアップ
            </Typography>
            <FormControl fullWidth>
              <TextField
                name="email"
                value={registerForm.email}
                type="text"
                label="メール"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="username"
                value={registerForm.username}
                type="text"
                label="ユーザー名"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name="password"
                value={registerForm.password}
                type="password"
                label="パスワード"
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel id="role">役割</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="role"
                value={registerForm.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={Role.CUSTOMER}
                  control={<Radio />}
                  label="ユーザー"
                />
                <FormControlLabel
                  value={Role.STORE_MANAGER}
                  control={<Radio />}
                  label="店長"
                />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" type="submit" fullWidth>
              サインアップ
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
              アカウントをお持ちですか？
              <Link href="/login">こちら</Link>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Register;
