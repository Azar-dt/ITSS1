import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

type Props = {
  store: {
    id: string;
    name: string;
    description: string;
    photoURL: string;
    address: string;
    rating: number;
  };
};

export const StoreCard: React.FC<Props> = ({ store }) => {
  return (
    <ProductItem>
      <Card sx={{ maxWidth: 305, borderRadius: "25px", padding: "30px 12px" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="120"
          image={store.photoURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {store.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {store.description} <br />
            <br />
            Address:{store.address}
          </Typography>
        </CardContent>
        <Typography component="legend">評価</Typography>
        <Rating name="read-only" value={store.rating} readOnly />
        <CardActions>
          <Button size="small" sx={{ marginLeft: "90px" }}>
            もっと見る
          </Button>
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
    background-color: #d4e8d7;
  }
`;
