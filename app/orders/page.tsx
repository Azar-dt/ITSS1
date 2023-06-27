"use client";

import Header from "@/components/Header";
import { DeleteForeverRounded } from "@mui/icons-material";
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
import * as React from "react";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "userName", label: "名前", minWidth: 100 },
  { id: "bikeImg", label: "バイク写真", minWidth: 100 },
  { id: "bikeName", label: "バイク名", minWidth: 100 },
  { id: "price", label: "価格", minWidth: 100 },
  { id: "startTime", label: "開始時間", minWidth: 100 },
  { id: "endTime", label: "終了時間", minWidth: 100 },
  { id: "status", label: "状況", minWidth: 100 },
  { id: "delete", label: "削除", minWidth: 100 },
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
    price: 100000,
    startTime: "11-06-2023",
    endTime: "30-07-2023",
    status: "Approved",
  },
  {
    id: 2,
    userName: "Anna",
    bikeImg: imgURL,
    bikeName: "Yamaha",
    price: 123000,
    startTime: "23-04-2023",
    endTime: "30-05-2023",
    status: "Cancelled",
  },
  {
    id: 3,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    startTime: "22-06-2023",
    endTime: "25-07-2024",
    status: "Pending",
  },
  {
    id: 4,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    startTime: "23-06-2023",
    endTime: "30-06-2023",
    status: "Pending",
  },
  {
    id: 5,
    userName: "Lenna",
    bikeImg: imgURL,
    bikeName: "Honda",
    price: 233000,
    startTime: "23-06-2023",
    endTime: "30-06-2023",
    status: "Pending",
  },
];

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick() {
    // eslint-disable-next-line no-console
    console.log("Button clicked for row ");
  }
  return (
    <>
      <Header />
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h3" component="span" fontWeight={700} my={5}>
          予約管理
        </Typography>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
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
                        <TableCell align="center">{row.userName}</TableCell>
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
                        <TableCell align="center">{row.bikeName}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.startTime}</TableCell>
                        <TableCell align="center">{row.endTime}</TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="subtitle2"
                            component="span"
                            fontWeight={700}
                            my={2}
                            px={2}
                            py={1}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleClick()}
                          >
                            削除
                            <DeleteForeverRounded fontSize="small" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
}
