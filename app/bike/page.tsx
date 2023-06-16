"use client";
import * as React from 'react';
import Header from "@/components/Header";
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import Tab, { tabClasses } from '@mui/base/Tab';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TtyIcon from '@mui/icons-material/Tty';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import styled1 from "styled-components";
import { styled } from '@mui/system';
const Img = styled('img')({
  // margin: 'auto',
  // display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
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
  margin: 6px 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
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
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${blue[500]};
  margin-bottom: 16px;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 10,
  },
});

const theme_tiltle = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 4,
  },
});
const Container = styled1.div`
  position: fixed;
  padding: 0 20px;
  display: flex;
  justifyContent: center;
  alignItems: center;
  padding: 100px 100px;
  backgroundColor: #fff;
  gridGap: 30px 60px;
`;
export default function UnstyledTabsCustomized() {
  return (
    <>
      <Header />
      <Tabs defaultValue={1}>
        <StyledTabsList>
          <StyledTab value={1}>ストア管理</StyledTab>
          <StyledTab value={2}>ストア情報</StyledTab>
        </StyledTabsList>
        <StyledTabPanel value={1}>
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                wordWrap: "break-word",
              }}
            >
              <ThemeProvider theme={theme_tiltle}>
                <Typography>
                  Happy Happy Happy Motobike Rental
                </Typography>
              </ThemeProvider>

              <Box sx={{ lineHeight: 3 }}>
                <ThemeProvider theme={theme}>
                  <Typography>
                    <LocationOnIcon />アドレス: Dai Co Viet, Hai Ba Trung, Ha Noi
                  </Typography>
                </ThemeProvider>
              </Box>

              <Box sx={{ lineHeight: 6 }}>
                <ThemeProvider theme={theme}>
                  <Typography>
                    <TtyIcon />電話番号: 0123456789
                  </Typography>
                </ThemeProvider>
              </Box>

              <Box sx={{ lineHeight: 6 }}>
                <Grid container spacing={0.05}>
                  <Grid item xs={2}>
                    <Button variant="contained" color="warning" size="large">
                      編集
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="secondary" size="large">
                      ストア削除
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <div>
              <ButtonBase sx={{ width: "600px" }}>
                <Img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" />
              </ButtonBase>
            </div>
          </Container>
        </StyledTabPanel>
        <StyledTabPanel value={2}>
          <Container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                wordWrap: "break-word",
              }}
            >
              <ThemeProvider theme={theme_tiltle}>
                <Typography>
                  Happy Happy Happy Motobike Rental
                </Typography>
              </ThemeProvider>

              <Box sx={{ lineHeight: 3 }}>
                <ThemeProvider theme={theme}>
                  <Typography>
                    <LocationOnIcon />アドレス: Dai Co Viet, Hai Ba Trung, Ha Noi
                  </Typography>
                </ThemeProvider>
              </Box>

              <Box sx={{ lineHeight: 6 }}>
                <ThemeProvider theme={theme}>
                  <Typography>
                    <TtyIcon />電話番号: 0123456789
                  </Typography>
                </ThemeProvider>
              </Box>

            </Box>
            <div>
              <ButtonBase sx={{ width: "600px" }}>
                <Img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" />
              </ButtonBase>
            </div>
          </Container>
        </StyledTabPanel>
      </Tabs >
    </>
  );
}

