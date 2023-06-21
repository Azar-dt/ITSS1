import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Bike } from "@prisma/client";
import React from "react";
import styled from "styled-components";

type Props = {
  bike: Bike;
};

const BikeCard: React.FC<Props> = ({ bike }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <ProductItem>
      <Card
        sx={{
          maxWidth: 305,
          borderRadius: "5px",
          padding: "30px 0",
          backgroundColor: "#dddddd",
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="120"
          image={
            bike.imgUrl ??
            // eslint-disable-next-line max-len
            "https://i.pinimg.com/originals/ab/f6/93/abf6931a2219d89bce1a5ee9fb1d6daa.jpg"
          }
        />
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Rating
            name="read-only"
            value={bike.rating}
            readOnly
            precision={0.5}
          />
          <Typography gutterBottom variant="h5" component="div">
            {bike.name}
          </Typography>
          <Typography variant="body2" color={red[400]}>
            ${bike.price}
          </Typography>
        </CardContent>
        {isHovered && (
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
            <Button variant="contained" style={{ backgroundColor: "#777" }}>
              借りる
            </Button>
          </CardActions>
        )}
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

export { BikeCard };
