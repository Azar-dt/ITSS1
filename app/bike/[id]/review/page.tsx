"use client";

import Header from "@/components/Header";
import OrderItem from "@/components/OrderItem";
import { Divider } from "@mui/material";
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
  total: 1,
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
  ],
};

export default function StorePage() {
  const [cursor] = useState(0);
  const take = 3;

  return (
    <>
      <Header />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "600",
          marginLeft: "600px",
          marginTop: "15px",
        }}
      >
        バイク評価
      </Typography>
      {DATA.orders.slice(cursor, cursor + take).map((order) => (
        <OrderCard>
          <OrderItem order={order} key={order.id} />
          <Divider sx={{ marginTop: 2, boxShadow: "0 6px 6px #ccc" }} />
        </OrderCard>
      ))}
    </>
  );
}