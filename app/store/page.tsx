/* eslint-disable max-len */

"use client";

import Header from "@/components/Header";
import { buttonClasses } from "@mui/base/Button";
import Tab, { tabClasses } from "@mui/base/Tab";
import TabPanel from "@mui/base/TabPanel";
import Tabs from "@mui/base/Tabs";
import TabsList from "@mui/base/TabsList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
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

export default function UnstyledTabsCustomized() {
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
          <Container />
        </StyledTabPanel>
      </Tabs>
    </>
  );
}
