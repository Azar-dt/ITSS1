/* eslint-disable max-len */

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import React from "react";
import styled1 from "styled-components";

const Img = styled("img")({
  // margin: 'auto',
  // display: 'block',
  maxWidth: "100%",
  maxHeight: "100%",
});
const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 14,
  },
});
export default function Home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={6}>
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
                label="ユーザー名前"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="メール"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="電話番号"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="パスワード"
                variant="outlined"
              />
              <FormControl fullWidth>
                <InputLabel id="time-start">予約開始時間</InputLabel>
                <Select
                  labelId="time-start"
                  id="time-start-select"
                  value={age}
                  label="予約終了時間"
                  onChange={handleChange}
                  autoWidth
                >
                  <MenuItem value={10}>10:00</MenuItem>
                  <MenuItem value={11}>11:00</MenuItem>
                  <MenuItem value={12}>12:00</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="time-start">予約終了時間</InputLabel>
                <Select
                  labelId="time-start"
                  id="time-start-select"
                  value={age}
                  label="予約終了時間"
                  onChange={handleChange}
                  autoWidth
                >
                  <MenuItem value={10}>10:00</MenuItem>
                  <MenuItem value={11}>11:00</MenuItem>
                  <MenuItem value={12}>12:00</MenuItem>
                </Select>
              </FormControl>
              <Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    size="large"
                    sx={{
                      padding: "10px 10px",
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography>予約</Typography>
                    </ThemeProvider>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box
              sx={{
                m: 10,
                lineHeight: "500%",
                // marginLeft: "15px",
              }}
            >
              <ButtonBase sx={{ width: "600px" }}>
                <Img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" />
              </ButtonBase>
              <Typography variant="h4">バイク名前</Typography>
              <Typography variant="h4">価格:$XXXX</Typography>
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
