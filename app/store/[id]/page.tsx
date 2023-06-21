"use client";

import Header from "@/components/Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import { Box, Container, Grid } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import { StoreBikeList } from "@/components/StoreBikeList";
import fetcher from "@/libs/fetcher";
import { Store } from "@prisma/client";
import * as React from "react";
import useSWR from "swr";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const NOW = "2023-06-21T09:26:40.759Z";

const DEFAULT_IMG =
  // eslint-disable-next-line max-len
  "https://i.pinimg.com/originals/ab/f6/93/abf6931a2219d89bce1a5ee9fb1d6daa.jpg";

export default function StorePage({ params }: { params: { id: string } }) {
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data, isLoading } = useSWR<Store>(`/api/store/${params.id}`, fetcher);

  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="ストア情報" {...a11yProps(0)} />
            <Tab label="バイクリスト" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
                  {data?.name}
                </Typography>

                <Typography sx={{ fontSize: "1.3rem", paddingBottom: "20px" }}>
                  <LocationOnIcon
                    sx={{
                      verticalAlign: "middle",
                      display: "inline-flex",
                    }}
                  />
                  {data?.address}
                </Typography>

                <Typography
                  sx={{ fontSize: "1.3rem", fontWeight: "600", pb: "3" }}
                >
                  <TtyIcon
                    sx={{
                      verticalAlign: "middle",
                      display: "inline-flex",
                    }}
                  />
                  電話番号: {data?.phoneNumber}
                </Typography>
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
                  // eslint-disable-next-line max-len
                  src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                />
              </Grid>
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StoreBikeList storeId={params.id} />
        </TabPanel>
      </Box>
    </>
  );
}
