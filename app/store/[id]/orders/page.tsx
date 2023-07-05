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
import { Bike, Order, Status } from "@prisma/client";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
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
  status: Status;
  bike: Bike;
  price: number;
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

export default function Orders({ params }: { params: { id: string } }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const router = useRouter();

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

  const handleAccept = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    const updatedTableData = orderData?.find((row: Order) => row.id === rowId);
    if (updatedTableData) {
      // setForm({ orderId: rowId, status: Status.ACCEPTED });
      const res = await axios.put(`/api/store/${params.id}/orders`, {
        orderId: rowId,
        status: Status.ACCEPTED,
      });
    }
    router.refresh();
  };

  const handleReject = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    const updatedTableData = orderData?.find((row: Order) => row.id === rowId);
    if (updatedTableData) {
      const res = await axios.put(`/api/store/${params.id}/orders`, {
        orderId: rowId,
        status: Status.REJECTED,
      });
    }
    router.refresh();
  };

  const handleComplete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    const updatedTableData = orderData?.find((row: Order) => row.id === rowId);
    if (updatedTableData) {
      const res = await axios.put(`/api/store/${params.id}/orders`, {
        orderId: rowId,
        status: Status.COMPLETED,
      });
    }
    router.refresh();
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
                          {row.price.toLocaleString("en-EN")}₫
                        </TableCell>
                        <TableCell align="center">{startTime}</TableCell>
                        <TableCell align="center">
                          {String(
                            dayjs(row.endTime).format("HH:mm - DD-MM-YYYY")
                          )}
                        </TableCell>
                        {row.status === "REQUESTED" ? (
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
                              <Button
                                variant="contained"
                                onClick={(e) => handleAccept(e, row.id)}
                              >
                                Accept
                              </Button>
                            </Box>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              {row.status === "ACCEPTED" ? (
                                <Button
                                  variant="contained"
                                  onClick={(e) => handleComplete(e, row.id)}
                                >
                                  Complete
                                </Button>
                              ) : (
                                <Box
                                  component={"div"}
                                  sx={{
                                    borderRadius: "4px",
                                    border: "1px solid green",
                                  }}
                                >
                                  <Typography
                                    color={"green"}
                                    sx={{
                                      padding: "5px 10px",
                                    }}
                                  >
                                    Completed
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                        )}
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
