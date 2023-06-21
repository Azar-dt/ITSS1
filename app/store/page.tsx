/* eslint-disable max-len */

"use client";

import { BikeList } from "@/components/BikeList";
import Header from "@/components/Header";
import { buttonClasses } from "@mui/base/Button";
import Tab, { tabClasses } from "@mui/base/Tab";
import TabPanel from "@mui/base/TabPanel";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { Bike } from "@prisma/client";
import { useState } from "react";
import styled1 from "styled-components";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px;
  margin: 8px 5px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  height: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  margin-bottom: 16px;
  border: none;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 10,
  },
});

const Container = styled1.div`
  padding: 0;
  display: flex;
  justifyContent: center;
  alignItems: center;
  backgroundColor: #fff;
  gridGap: 30px 60px;
`;

const NOW = "2023-06-21T09:26:40.759Z";

const DEFAULT_IMG =
  "https://i.pinimg.com/originals/ab/f6/93/abf6931a2219d89bce1a5ee9fb1d6daa.jpg";
const DATA: {
  total: number;
  bikes: Bike[];
} = {
  total: 10,
  bikes: [
    {
      id: 1,
      storeId: 1,
      name: "Bike 1",
      price: 1,
      type: "CC150",
      rating: 5,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 2,
      storeId: 1,
      name: "Bike 2",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 3,
      storeId: 1,
      name: "Bike 3",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 4,
      storeId: 1,
      name: "Bike 4",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 5,
      storeId: 1,
      name: "Bike 5",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 6,
      storeId: 1,
      name: "Bike 6",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 7,
      storeId: 1,
      name: "Bike 7",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 8,
      storeId: 1,
      name: "Bike 8",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 9,
      storeId: 1,
      name: "Bike 9",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 10,
      storeId: 1,
      name: "Bike 10",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
  ],
};

export default function StorePage() {
  const [cursor, setCursor] = useState(0);
  const take = 6;

  return (
    <>
      <Header />
      <Tabs defaultValue={1}>
        <StyledTabsList sx={{ marginTop: "20px" }}>
          <StyledTab value={1}>
            <Typography variant="subtitle1">ストア情報</Typography>
          </StyledTab>
          <StyledTab value={2}>
            <Typography variant="subtitle1">バイクリスト</Typography>
          </StyledTab>
        </StyledTabsList>

        <StyledTabPanel value={1}>
          <Container>
            <Grid container sx={{ p: "0 10px", height: "100%" }}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  wordWrap: "break-word",
                  justifyContent: "center",
                  padding: "10px 40px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700",
                    paddingBottom: "20px",
                  }}
                >
                  Happy Happy Happy Motobike Rental
                </Typography>

                <ThemeProvider theme={theme}>
                  <Typography
                    sx={{ fontSize: "1.3rem", paddingBottom: "20px" }}
                  >
                    <LocationOnIcon
                      sx={{
                        verticalAlign: "middle",
                        display: "inline-flex",
                      }}
                    />
                    アドレス: Dai Co Viet, Hai Ba Trung, Ha Noi
                  </Typography>
                </ThemeProvider>

                <ThemeProvider theme={theme}>
                  <Typography
                    sx={{ fontSize: "1.3rem", fontWeight: "600", pb: "3" }}
                  >
                    <TtyIcon
                      sx={{
                        verticalAlign: "middle",
                        display: "inline-flex",
                      }}
                    />
                    電話番号: 0123456789
                  </Typography>
                </ThemeProvider>
              </Grid>

              <Grid
                item
                xs={6}
                sx={{
                  bgcolor: "#f5efe7",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "30px",
                  height: "100",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "80%",
                    borderRadius: "8px",
                  }}
                  alt="The bike"
                  src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                />
              </Grid>
            </Grid>
          </Container>
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Container
                style={{
                  display: "flex",
                  margin: "16px 20px",
                  justifyContent: "center",
                }}
              >
                <span>
                  <FilterAltIcon style={{ color: "#aaa" }} />
                </span>
                <Box
                  sx={{
                    maxWidth: 200,
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    height: "max-content",
                    flexGrow: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    component="div"
                    sx={{
                      flexGrow: 1,
                      padding: "10px",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    フィルター
                  </Typography>
                  <Divider />
                  <List component="nav" aria-label="secondary mailbox folder">
                    <ListItemButton>
                      <ListItemText primary="バイクの種類別" />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton>
                      <ListItemText primary="値段" />
                    </ListItemButton>
                  </List>
                </Box>
              </Container>
            </Grid>
            <Grid item xs={9} sx={{ background: "#cdcdcd", marginTop: 1 }}>
              <BikeList
                data={{
                  ...DATA,
                  bikes: DATA.bikes.slice(cursor, cursor + take),
                }}
                cursor={cursor}
                setCursor={setCursor}
                take={take}
              />
            </Grid>
          </Grid>
        </StyledTabPanel>
      </Tabs>
    </>
  );
}