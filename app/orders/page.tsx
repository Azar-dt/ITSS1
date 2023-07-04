"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import fetcher from "@/libs/fetcher";
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
import { Order } from "@prisma/client";
import * as React from "react";
import useSWR from "swr";

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
  {
    id: "price",
    label: "価格",
    minWidth: 100,
    // format: (value: number) => `${value.toLocaleString()} VND`,
  },
  { id: "startTime", label: "開始時間", minWidth: 100 },
  { id: "endTime", label: "終了時間", minWidth: 100 },
  { id: "status", label: "状況", minWidth: 100 },
  { id: "delete", label: "削除", minWidth: 300 },
];

const imgURL =
  // eslint-disable-next-line max-len, sonarjs/no-duplicate-string
  "https://images.unsplash.com/photo-1508357941501-0924cf312bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW90b2Jpa2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80";

export default function Orders() {
  const { data: currentUser } = useCurrentUser();
  const { data } = useSWR<Order[]>(`/api/orders/${currentUser?.id}`, fetcher);
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
          maxWidth: "auto",
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
                {data &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((row) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">
                            <Box
                              component="img"
                              sx={{
                                width: "150px",
                                borderRadius: "8px",
                              }}
                              alt="The bike"
                              src={imgURL}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.price.toLocaleString("vi-VN")}
                          </TableCell>
                          <TableCell align="center">
                            {row.startTime.toString()}
                          </TableCell>
                          <TableCell align="center">
                            {row.endTime.toString()}
                          </TableCell>
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
            count={10}
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
