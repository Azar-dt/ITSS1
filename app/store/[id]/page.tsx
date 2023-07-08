/* eslint-disable max-len */

"use client";

import Header from "@/components/Header";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TtyIcon from "@mui/icons-material/Tty";
import { Box, Button, Container, DialogTitle, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import StoreBikeList, { BIKE_TYPES } from "@/components/StoreBikeList";
import fetcher from "@/libs/fetcher";
import Modal from "@mui/material/Modal";
import { Bike, Review, Store, User } from "@prisma/client";
import * as React from "react";
import useSWR from "swr";

import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type ReviewType = Review & {
  bike: Bike;
  user: User;
};

export default function StorePage({ params }: { params: { id: string } }) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data } = useSWR<Store>(`/api/store/${params.id}`, fetcher);
  const { data: review } = useSWR<ReviewType[]>(
    `/api/reviews/${data?.id}`,
    fetcher
  );
  const len = review ? review.length : 0;

  const [cursor, setCursor] = React.useState(0);
  const take = 6;
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [bikeType, setBikeType] = React.useState<string | undefined>(undefined);
  const [price, setPrice] = React.useState<number | undefined>(undefined);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index === selectedIndex) {
      setBikeType(undefined);
      setSelectedIndex(-1);
      return;
    }
    setSelectedIndex(index);
    // eslint-disable-next-line security/detect-object-injection
    if (index === -1) {
      setBikeType(undefined);
    } else setBikeType(BIKE_TYPES[index].name);
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
                  sx={{ marginTop: "30px", maxWidth: "25%" }}
                  variant="contained"
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
                          marginBottom: "30px",
                        }}
                      >
                        <IconButton
                          onClick={handleClose}
                          sx={{
                            position: "fixed",
                            right: "30px",
                          }}
                        >
                          <CloseIcon fontSize="large" />
                        </IconButton>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            component="span"
                            fontWeight={600}
                            my={4}
                          >
                            評価
                          </Typography>
                        </Box>

                        <Paper
                          sx={{
                            overflow: "auto",
                            maxHeight: "400px",
                            boxShadow: "none",
                          }}
                        >
                          {review?.length !== 0 ? (
                            <Stack spacing={4}>
                              {review &&
                                review?.slice().map((row) => {
                                  return (
                                    <Box
                                      sx={{
                                        width: "100%",
                                        display: "flex",
                                      }}
                                    >
                                      <Box
                                        component="img"
                                        sx={{
                                          width: "150px",
                                          borderRadius: "8px",
                                          marginRight: "18px",
                                        }}
                                        alt="The bike"
                                        src={row.bike.imgUrl}
                                      />
                                      <Box>
                                        <Typography
                                          sx={{ marginBottom: "10px" }}
                                        >
                                          {row.user.username}
                                        </Typography>
                                        <Rating
                                          name="simple-controlled"
                                          value={row.rating}
                                          readOnly
                                        />
                                        <Typography>{row.comment}</Typography>
                                      </Box>
                                    </Box>
                                  );
                                })}
                            </Stack>
                          ) : (
                            <Box
                              p={2}
                              sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  paddingBottom: "20px",
                                }}
                              >
                                評価がありません
                              </Typography>
                            </Box>
                          )}
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
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  maxHeight: "700px",
};
