"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import defaultBike from "@/public/default-bike.jpg";
import flowerLogo from "@/public/logo.png";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
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
import Image from "next/image";
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

    try {
      const res = await axios.post("/api/register", registerForm);

      if (res?.status !== 200) {
        toast.error(`サインアップに失敗しました\n${res.statusText}`);
        return;
      }

      if (res?.status === 200) {
        toast.success("サインアップしました");
        router.push("/login");
      }
    } catch (error) {
      toast.error(`サインアップに失敗しました\n${error}`);
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
                <FormControl fullWidth sx={{ marginLeft: "10px" }}>
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
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Register;
