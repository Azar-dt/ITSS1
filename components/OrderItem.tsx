import {
  Button,
  Grid,
  Rating,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Bike, Order, Status } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  order: Order & {
    bike: Pick<Bike, "name" | "imgUrl">;
  };
};

const statusMapping = (status: string): string => {
  switch (status) {
    case Status.ACCEPTED:
      return "確認 ✔";
    case Status.REQUESTED:
      return "待っている ⚠";
    case Status.REJECTED:
      return "";
    case Status.CANCELLED:
      return "";
    case Status.COMPLETED:
      return "";
    default:
      return "";
  }
};

const OrderItem: React.FC<Props> = ({ order }) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Image
          src={order.bike.imgUrl}
          alt={order.name}
          width={120}
          height={120}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={20} fontWeight={600}>
          {order.bike.name}
        </Typography>
        <Typography sx={{ color: "#f01d0e", marginBottom: 3 }}>
          {order.price}円
        </Typography>
        <Typography>Status: {statusMapping(order.status)}</Typography>
        {order.status === Status.ACCEPTED && (
          <>
            <Typography sx={{ marginTop: 2 }}>
              評価: <Rating name="read-only" value={5} precision={0.5} />
            </Typography>
            <TextareaAutosize
              minRows={5}
              style={{
                width: "100%",
                borderRadius: 4,
                padding: 4,
                marginTop: 4,
              }}
              name="Solid"
              placeholder="評価"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#eebdf2",
                color: "#000",
                float: "right",
                marginRight: -1,
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              評価
            </Button>
          </>
        )}
        {order.status === Status.REQUESTED && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f58d47",
              color: "#000",
              float: "right",
              marginRight: -1,
              fontWeight: 600,
            }}
          >
            キャンセル
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderItem;
