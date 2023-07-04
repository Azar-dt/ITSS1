"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import fetcher from "@/libs/fetcher";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Bike, Order } from "@prisma/client";
// import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import useSWR from "swr";

type OrderInfo = {
  id: number;
  name: string;
  email: string;
  userId: number;
  bikeId: number;
  phoneNumber: string;
  startTime: Dayjs;
  endTime: Dayjs;
  status: string;
  bike: Bike;
};

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "bikeImg", label: "Bike Image", minWidth: 100 },
  { id: "userName", label: "Name", minWidth: 100 },
  { id: "bikeName", label: "Bike name", minWidth: 100 },
  { id: "phoneNumber", label: "Phone number", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    format: (value: number) => `${value.toLocaleString("en-EN")}₫`,
  },
  { id: "startTime", label: "Start time", minWidth: 100 },
  { id: "endTime", label: "End time", minWidth: 100 },
  { id: "statusOrder", label: "Action", minWidth: 250 },
];

// const imgURL =
// eslint-disable-next-line max-len, sonarjs/no-duplicate-string
//   "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90b2Jpa2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

// const rows = [
//   {
//     id: 1,
//     userName: "John",
//     bikeImg: imgURL,
//     bikeName: "Ducati",
//     phoneNumber: "0112100000",
//     price: 100000,
//     startTime: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     statusOrder: "Approved",
//   },
//   {
//     id: 2,
//     userName: "Anna",
//     bikeImg: imgURL,
//     bikeName: "Yamaha",
//     phoneNumber: "0112100000",
//     price: 1000000,
//     startTime: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     statusOrder: "Cancelled",
//   },
//   {
//     id: 3,
//     userName: "Lena",
//     bikeImg: imgURL,
//     bikeName: "Honda",
//     phoneNumber: "0112100000",
//     price: 2300000,
//     startTime: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     statusOrder: "Pending",
//   },
//   {
//     id: 4,
//     userName: "Lena1",
//     bikeImg: imgURL,
//     bikeName: "Honda",
//     phoneNumber: "0112101100",
//     price: 230000,
//     startTime: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     statusOrder: "Pending",
//   },
//   {
//     id: 5,
//     userName: "Lena2",
//     bikeImg: imgURL,
//     bikeName: "Honda",
//     phoneNumber: "0112101100",
//     price: 230000,
//     startTime: dayjs(Date.now()),
//     endTime: dayjs(Date.now()),
//     statusOrder: "Pending",
//   },
//   {
//     id: 6,
//     userName: "Lena3",
//     bikeImg: imgURL,
//     bikeName: "Honda",
//     phoneNumber: "0112101100",
//     price: 300000,
//     startTime: "23-06-2023",
//     endTime: "30-06-2023",
//     statusOrder: "Pending",
//   },
// ];

export default function Orders({ params }: { params: { id: string } }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [form, setForm] = React.useState<OrderInfo>({
    id: -1,
    email: "ttrang@trang",
    name: "",
    phoneNumber: "",
    userId: 1,
    bikeId: 1,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    status: "requested",
    bike: {
      id: 1,
      imgUrl: "",
      name: "",
      price: 1,
      rating: 4,
      storeId: 1,
      type: "MANUAL",
    },
  });

  const { data: orderData, isLoading: orderLoading } = useSWR(
    `/api/store/${params.id}/orders`,
    fetcher
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm({ ...form, status: "ACCEPTED" });

    // const res = await axios.post("/api/store/...", { form });
  };

  const handleReject = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    const updatedTableData = orderData?.find((row: Order) => row.id === rowId);
    if (updatedTableData) {
      setForm({
        ...updatedTableData,
        startTime: dayjs(updatedTableData.startTime),
        endTime: dayjs(updatedTableData.endTime),
        status: "REJECTED",
      });
    }

    // console.log(form);
    // const res = await axios.post("/api/store/", { ...form });
  };

  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h4" component="span" fontWeight={600} my={5}>
          Orders Management
        </Typography>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 550 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        align="center"
                        sx={{ backgroundColor: "#9DB2BF", fontWeight: "700" }}
                      >
                        {column.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row: OrderInfo) => {
                    // const formattedPrice =
                    //   columns
                    //     .find((col) => col.id === "price")
                    //     ?.format?.(
                    //       row.price !== undefined
                    //         ? Number(row.price).toLocaleString()
                    //         : 100
                    //     ) || row.price;
                    const startTime = String(
                      dayjs(row.startTime).format("HH:mm - DD-MM-YYYY")
                    );
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell align="center">
                          <Box
                            component="img"
                            sx={{
                              width: "150px",
                              borderRadius: "8px",
                            }}
                            alt="The bike"
                            src={row.bike.imgUrl}
                          />
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.bike.name}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">
                          {row.bike.price.toLocaleString("en-EN")}₫
                        </TableCell>
                        <TableCell align="center">{startTime}</TableCell>
                        <TableCell align="center">
                          {String(
                            dayjs(row.endTime).format("HH:mm - DD-MM-YYYY")
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Button
                              variant="outlined"
                              onClick={(e) => handleReject(e, row.id)}
                            >
                              Decline
                            </Button>
                            <Button variant="contained" onClick={handleAccept}>
                              Accept
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={Number.isInteger(orderData?.length) ? orderData?.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
      <Footer />
    </>
  );
}
