"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
// import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";

type OrderInfo = {
  id: number;
  userName: string;
  bikeName: string;
  bikeImg: string;
  phoneNumber: string;
  price: number;
  startTime: Dayjs;
  endTime: Dayjs;
  statusOrder: string;
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

const imgURL =
  // eslint-disable-next-line max-len, sonarjs/no-duplicate-string
  "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90b2Jpa2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

const rows = [
  {
    id: 1,
    userName: "John",
    bikeImg: imgURL,
    bikeName: "Ducati",
    phoneNumber: "0112100000",
    price: 100000,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "Approved",
  },
  {
    id: 2,
    userName: "Anna",
    bikeImg: imgURL,
    bikeName: "Yamaha",
    phoneNumber: "0112100000",
    price: 1000000,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "Cancelled",
  },
  {
    id: 3,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112100000",
    price: 2300000,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "Pending",
  },
  {
    id: 4,
    userName: "Lenna1",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    price: 230000,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "Pending",
  },
  {
    id: 5,
    userName: "Lenna2",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    price: 230000,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "Pending",
  },
  {
    id: 6,
    userName: "Lenna3",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    price: 300000,
    startTime: "23-06-2023",
    endTime: "30-06-2023",
    statusOrder: "Pending",
  },
];

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [form, setForm] = React.useState<OrderInfo>({
    id: -1,
    bikeName: "",
    bikeImg: imgURL,
    userName: "",
    phoneNumber: "",
    price: 0,
    startTime: dayjs(Date.now()),
    endTime: dayjs(Date.now()),
    statusOrder: "requested",
  });

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
    setForm({ ...form, statusOrder: "accepted" });

    // const res = await axios.post("/api/store/...", { form });
  };

  const handleReject = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    const updatedTableData = rows.find((row) => row.id === rowId);
    if (updatedTableData) {
      setForm({
        ...updatedTableData,
        startTime: dayjs(updatedTableData.startTime),
        endTime: dayjs(updatedTableData.endTime),
        statusOrder: "rejected",
      });
    }

    console.log(form);
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const formattedPrice =
                      columns
                        .find((col) => col.id === "price")
                        ?.format?.(row.price) || row.price;
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
                            src={row.bikeImg}
                          />
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.bikeName}</TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">{formattedPrice}</TableCell>
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
            count={rows.length}
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
