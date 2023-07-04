/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-len */

"use client";

import Header from "@/components/Header";
import OrderItem from "@/components/OrderItem";
import { Divider, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Bike, Order } from "@prisma/client";
import { useState } from "react";
import styled1 from "styled-components";

type OrderWithBikeInfo = Order & {
  bike: Pick<Bike, "name" | "imgUrl">;
};

const OrderCard = styled1.div`
  margin-top: 16px;
`;

const DEFAULT_IMG = "/default-bike.jpg";
const DEFAULT_TIME = new Date(Date.now());
const DATA: {
  total: number;
  orders: OrderWithBikeInfo[];
} = {
  total: 10,
  orders: [
    {
      id: 1,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 1",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 2,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "REQUESTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 2",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 3,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 3",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 4,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 4",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 5,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 5",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 6,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 6",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 7,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 7",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 8,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 8",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 9,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 9",
        imgUrl: DEFAULT_IMG,
      },
    },
    {
      id: 10,
      userId: "1",
      bikeId: 2,
      email: "test@gmail.com",
      name: "order 1",
      phoneNumber: "123456789",
      price: 1000,
      startTime: DEFAULT_TIME,
      endTime: DEFAULT_TIME,
      status: "ACCEPTED",
      createdAt: DEFAULT_TIME,
      updatedAt: DEFAULT_TIME,
      bike: {
        name: "Wave Alpha 10",
        imgUrl: DEFAULT_IMG,
      },
    },
  ],
};

export default function StorePage() {
  const [cursor, setCursor] = useState(0);
  const take = 3;

  return (
    <>
      <Header />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "600",
          marginLeft: "30px",
          marginTop: "10px",
          borderBottom: "1px solid #999",
          boxShadow: "0 8px 6px #ccc",
        }}
      >
        予約管理
      </Typography>
      {DATA.orders.slice(cursor, cursor + take).map((order) => (
        <OrderCard>
          <OrderItem order={order} key={order.id} />
          <Divider sx={{ marginTop: 2, boxShadow: "0 6px 6px #ccc" }} />
        </OrderCard>
      ))}
      <Pagination
        sx={{
          marginTop: 3,
          marginBottom: 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(e, page) => setCursor((page - 1) * take)}
        count={Math.floor(DATA.total / take) + 1}
        color="primary"
      />
    </>
  );
}
