"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderItem from "@/components/OrderItem";
import fetcher from "@/libs/fetcher";
import Typography from "@mui/material/Typography";
import { Bike } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

type reviewContent = {
  rating: number;
  comment: string;
};

export default function StorePage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState<reviewContent>({
    rating: 0,
    comment: "",
  });

  const { data: bikeData } = useSWR<Bike>(`/api/bike/${params.id}`, fetcher);

  return (
    <>
      <Header />
      <Typography
        variant="h3"
        sx={{
          fontWeight: "500",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        バイク評価
      </Typography>

      <OrderItem
        content={content}
        setContent={setContent}
        bike={bikeData as Bike}
        id={Number(params.id)}
      />
      <Footer />
    </>
  );
}
