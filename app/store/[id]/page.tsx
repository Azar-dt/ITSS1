/* eslint-disable max-len */

"use client";

import Header from "@/components/Header";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import { Box, Button, Container, DialogTitle, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import StoreBikeList, { BIKE_TYPES } from "@/components/StoreBikeList";
import fetcher from "@/libs/fetcher";
import Modal from "@mui/material/Modal";
import { Store } from "@prisma/client";
import * as React from "react";
import useSWR from "swr";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const imgURL =
  // eslint-disable-next-line max-len, sonarjs/no-duplicate-string
  "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90b2Jpa2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

const rows = [
  {
    id: 1,
    userName: "John",
    bikeImg: imgURL,
    bikeName: "Ducati",
    price: 100000,
    comment: "はやい、はやい",
  },
  {
    id: 2,
    userName: "Anna",
    bikeImg: imgURL,
    bikeName: "Yamaha",
    price: 123000,
    comment: "はやい、はやい",
  },
  {
    id: 3,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    comment: "はやい、はやい",
  },
  {
    id: 4,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    comment: "はやい、はやい",
  },
  {
    id: 5,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    comment: "はやい、はやい",
  },
];

export default function StorePage({ params }: { params: { id: string } }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading } = useSWR<Store>(`/api/store/${params.id}`, fetcher);

  const [cursor, setCursor] = React.useState(0);
  const take = 6;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [bikeType, setBikeType] = React.useState<string | undefined>(undefined);
  const [price, setPrice] = React.useState<number | undefined>(undefined);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index === selectedIndex) {
      setBikeType(undefined);
    }
    setSelectedIndex(index);
    // eslint-disable-next-line security/detect-object-injection
    setBikeType(BIKE_TYPES[index].name);
  };

  const { data: bikeData, isLoading: bikeLoading } = useSWR(
    // eslint-disable-next-line max-len
    `/api/bike?storeId=${params.id}&cursor=${cursor}&take=${take}&type=${
      bikeType ?? ""
    }&price=${price ?? ""}`,
    fetcher
  );

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
            <Tab
              label="ストア情報"
              {...a11yProps(0)}
              sx={{
                fontSize: "1.5rem",
              }}
            />
            <Tab
              label="バイクリスト"
              {...a11yProps(1)}
              sx={{
                fontSize: "1.5rem",
              }}
            />
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

                <Button
                  sx={{ marginTop: "30px" }}
                  variant="contained"
                  href="#contained-buttons"
                  onClick={handleOpen}
                >
                  評価を見る
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <DialogTitle id="comment">
                      <Container
                        sx={{
                          display: "block",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h3"
                            component="span"
                            fontWeight={700}
                            my={5}
                          >
                            評価を見る
                          </Typography>
                          <IconButton onClick={handleClose}>
                            <CloseIcon />
                          </IconButton>
                        </Box>

                        <Paper sx={{ overflow: "auto" }}>
                          <TableContainer sx={{ maxHeight: 550 }}>
                            <Table stickyHeader aria-label="table comment">
                              <TableBody>
                                {rows.slice().map((row) => {
                                  return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                      {/* <TableCell align="center"> */}
                                      <TableCell>
                                        <Box
                                          component="img"
                                          sx={{
                                            width: "150px",
                                            borderRadius: "8px",
                                          }}
                                          alt="The bike"
                                          src={row.bikeImg}
                                        />
                                      </TableCell>
                                      <TableCell align="left">
                                        <Typography>{row.bikeName}</Typography>
                                        <Typography>{row.comment}</Typography>
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </Container>
                    </DialogTitle>
                  </Box>
                </Modal>
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
                  src={data?.imgUrl}
                />
              </Grid>
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StoreBikeList
            data={bikeData}
            isLoading={bikeLoading}
            cursor={cursor}
            setCursor={setCursor}
            take={take}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            price={price}
            setPrice={setPrice}
          />
        </TabPanel>
      </Box>
    </>
  );
}

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
};
