import useCurrentUser from "@/hooks/useCurrentUser";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Bike } from "@prisma/client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {
  id: number;
  content: { rating: number; comment: string };
  setContent: (reviewContent: { rating: number; comment: string }) => void;
  bike: Bike;
};

const OrderItem: React.FC<Props> = ({ content, setContent, bike, id }) => {
  const { data, isLoading } = useCurrentUser();
  const [value, setValue] = React.useState<number>(0);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent({ ...content, comment: e.target.value });
  };

  const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/api/reviews", {
      ...content,
      bikeId: id,
      userId: data.id,
    });

    if (res?.status !== 200) {
      toast.error(`error\n${res.statusText}`);
      return;
    }
    toast.success("success");
  };

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
        <img src={bike?.imgUrl} alt={bike?.name} width={150} />
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={20} fontWeight={600}>
          {bike?.name}
        </Typography>
        <Typography sx={{ color: "#f01d0e", marginBottom: 3 }}>
          {bike?.price.toLocaleString("en-EN")}VND
        </Typography>

        <Box component="form" onSubmit={handleReview}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(Number(newValue));
              setContent({ ...content, rating: value });
            }}
          />
          <TextareaAutosize
            minRows={5}
            style={{
              width: "100%",
              borderRadius: 4,
              minHeight: 50,
            }}
            name="comment"
            placeholder="評価"
            onChange={handleChange}
            value={content.comment}
          />
          <Button
            variant="contained"
            sx={{
              float: "right",
              margin: 2,
            }}
            type="submit"
          >
            評価
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
