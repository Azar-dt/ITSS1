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
  name: string;
  bikeName: string;
  email?: string;
  phoneNumber: string;
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
  { id: "bikeImg", label: "バイク写真", minWidth: 100 },
  { id: "userName", label: "名前", minWidth: 100 },
  { id: "bikeName", label: "バイク名", minWidth: 100 },
  { id: "phoneNumber", label: "電話番号", minWidth: 100 },
  { id: "startTime", label: "開始時間", minWidth: 100 },
  { id: "endTime", label: "終了時間", minWidth: 100 },
  { id: "status", label: "拒否 / 承認", minWidth: 200 },
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
    startTime: "11-06-2023",
    endTime: "30-07-2023",
    status: "Approved",
  },
  {
    id: 2,
    userName: "Anna",
    bikeImg: imgURL,
    bikeName: "Yamaha",
    phoneNumber: "0112100000",
    startTime: "23-04-2023",
    endTime: "30-05-2023",
    status: "Cancelled",
  },
  {
    id: 3,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112100000",
    startTime: "22-06-2023",
    endTime: "25-07-2024",
    status: "Pending",
  },
  {
    id: 4,
    userName: "Lenna1",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    startTime: "23-06-2022",
    endTime: "30-06-2022",
    status: "Pending",
  },
  {
    id: 5,
    userName: "Lenna2",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    startTime: "23-06-2023",
    endTime: "30-06-2023",
    status: "Pending",
  },
  {
    id: 6,
    userName: "Lenna3",
    bikeImg: imgURL,
    bikeName: "Honda",
    phoneNumber: "0112101100",
    startTime: "23-06-2023",
    endTime: "30-06-2023",
    statusOrder: "Pending",
  },
];

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [form, setForm] = React.useState<OrderInfo>({
    bikeName: "",
    name: "",
    email: "",
    phoneNumber: "",
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

  const handleReject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm({ ...form, statusOrder: "rejected" });

    // const res = await axios.post("/api/store/", { ...form });
  };

  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h4" component="span" fontWeight={600} my={5}>
          予約リスト
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
                        <TableCell align="center">{row.startTime}</TableCell>
                        <TableCell align="center">{row.endTime}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            onClick={handleReject}
                            sx={{
                              marginRight: "20px",
                            }}
                          >
                            拒否
                          </Button>
                          <Button variant="contained" onClick={handleAccept}>
                            承認
                          </Button>
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
