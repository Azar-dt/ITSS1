"use client";

import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import fetcher from "@/libs/fetcher";
import { DeleteForeverRounded } from "@mui/icons-material";
import RateReviewIcon from "@mui/icons-material/RateReview";
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjsIsBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-hot-toast";
import useSWR from "swr";

dayjs.extend(customParseFormat);
dayjs.extend(dayjsIsBetween);
dayjs.extend(utc);
dayjs.extend(timezone);
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
  { id: "delete", label: "アクション", minWidth: 300 },
];

type OderType = Order & {
  bike: Bike;
};

export default function Orders() {
  const { data: currentUser } = useCurrentUser();
  const { data } = useSWR<OderType[]>(
    currentUser?.id ? `/api/orders/${currentUser.id}` : null,
    fetcher
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCancel = async (
    e: React.MouseEvent<HTMLButtonElement>,
    rowId: number
  ) => {
    e.preventDefault();

    try {
      const updatedTableData = data?.find((row: Order) => row.id === rowId);
      if (updatedTableData) {
        const res = await axios.put(
          `/api/store/${currentUser?.store?.id}/orders`,
          {
            orderId: rowId,
            status: Status.CANCELLED,
          }
        );
        if (res.status === 200) window.location.reload();
        toast.success("キャンセルしました");
      }
    } catch (error) {
      toast.error("キャンセルできませんでした");
    }
  };

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
                        sx={{
                          backgroundColor: "#9DB2BF",
                          fontWeight: "700",
                          fontSize: "18px",
                        }}
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
                              src={row?.bike.imgUrl}
                            />
                          </TableCell>
                          <TableCell align="center">{row?.bike.name}</TableCell>
                          <TableCell align="center">
                            {row.price.toLocaleString("vi-VN")} VND
                          </TableCell>
                          <TableCell align="center">
                            {dayjs
                              .tz(row.startTime.toString(), "Asia/Ho_Chi_Minh")
                              .format("YYYY/MM/DD HH:mm")}
                          </TableCell>
                          <TableCell align="center">
                            {dayjs
                              .tz(row.endTime.toString(), "Asia/Ho_Chi_Minh")
                              .format("YYYY/MM/DD HH:mm")}
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
                          {row.status === "REQUESTED" ||
                          row.status === "ACCEPTED" ? (
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                onClick={(e) => handleCancel(e, row.id)}
                              >
                                キャンセル
                                <DeleteForeverRounded fontSize="small" />
                              </Button>
                            </TableCell>
                          ) : (
                            <TableCell align="center">
                              {row.status === "COMPLETED" ? (
                                <Button
                                  variant="contained"
                                  onClick={() =>
                                    router.push(`bike/${row?.bike?.id}/review`)
                                  }
                                >
                                  評価
                                  <RateReviewIcon fontSize="small" />
                                </Button>
                              ) : (
                                ""
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            // eslint-disable-next-line no-unsafe-optional-chaining
            count={data ? data?.length / rowsPerPage : -1}
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
