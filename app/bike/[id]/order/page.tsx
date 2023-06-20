"use client";

import Header from "@/components/Header";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import styled1 from "styled-components";

type OrderForm = {
  name: string;
  email?: string;
  phoneNumber: string;
  startTime: Dayjs;
  endTime: Dayjs;
};

export default function BikeOrder() {
  const [form, setForm] = React.useState<OrderForm>({
    name: "",
    email: "",
    phoneNumber: "",
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "60ch" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                m: 4,
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h3">バイク予約</Typography>
              <TextField
                id="outlined-basic"
                name="name"
                label="ユーザー名前"
                variant="outlined"
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="email"
                label="メール"
                variant="outlined"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                name="phoneNumber"
                label="電話番号"
                variant="outlined"
                value={form.phoneNumber}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <DateTimePicker
                  label="Controlled picker"
                  value={form.startTime}
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      startTime: dayjs(newValue),
                    });
                  }}
                />
              </FormControl>

              <FormControl>
                <DateTimePicker
                  label="Controlled picker"
                  value={form.endTime}
                  onChange={(newValue) => {
                    setForm({
                      ...form,
                      endTime: dayjs(newValue),
                    });
                  }}
                />
              </FormControl>
              <Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      padding: "10px 10px",
                    }}
                  >
                    <Typography>予約</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    sx={{
                      padding: "10px 10px",
                    }}
                  >
                    <Typography>キャンセル</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={6} item>
            <Box
              sx={{
                m: 10,
                lineHeight: "500%",
              }}
            >
              <ButtonBase
                sx={{
                  width: "600px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <Img
                  // eslint-disable-next-line max-len
                  src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                  sx={{
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <Box
                  sx={{
                    padding: "10px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    バイク名前
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    価格:$XXXX
                  </Typography>
                </Box>
              </ButtonBase>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const Container = styled1.div`
  padding: 20px 60px;
  alignItems: center;
  margin-left: 25px;
`;

const Img = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});
