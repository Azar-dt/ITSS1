import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Store } from "@prisma/client";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  store: Store;
};

export const StoreCard: React.FC<Props> = ({ store }) => {
  return (
    <ProductItem>
      <Card sx={{ maxWidth: 305, borderRadius: "25px", padding: "30px 12px" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="160"
          image={store.imgUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {store.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {store.bio} <br />
            <br />
            住所: {store.address}
          </Typography>
        </CardContent>
        <Typography component="legend">評価</Typography>
        <Rating
          name="read-only"
          value={store.rating}
          readOnly
          precision={0.5}
        />
        <CardActions
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            a: {
              textDecoration: "none",
            },
          }}
        >
          <Link href={`/store/${store.id}`}>もっと見る</Link>
        </CardActions>
      </Card>
    </ProductItem>
  );
};

const ProductItem = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  cursor: pointer;
  box-shadow: 16px 16px 30px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  :hover {
    background-color: #e4e4e4;
  }
`;
