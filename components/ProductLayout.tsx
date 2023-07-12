import { Rating, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Store } from "@prisma/client";
import React from "react";
import { FilterList } from "./FilterList";
import { StoreCard } from "./StoreCard";

type Props = {
  isLoading: boolean;
  data?: {
    total: number;
    stores: Store[];
  };
  cursor: number;
  setCursor: (cursor: number) => void;
  take: number;
  setStoreAddress: (storeAddress: {
    longitude?: number;
    latitude?: number;
  }) => void;
  setRadius: (radius: number | null) => void;
  rate: number;
  setRate: (rate: number) => void;
};

const ProductLayout: React.FC<Props> = ({
  isLoading,
  data,
  cursor,
  setCursor,
  take,
  setStoreAddress,
  setRadius,
  rate,
  setRate,
}) => {
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCursor((value - 1) * take);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <FilterList setStoreAddress={setStoreAddress} setRadius={setRadius} />
      <Box
        component="div"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#e4e4e4",
            width: "97.3%",
            padding: "12px 24px",
            justifyContent: "flex-start",
            gap: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" component="span" fontWeight={700}>
            並べ替え
          </Typography>
          <Stack direction="row" spacing={2}>
            <Rating
              name="read-only"
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue as number);
              }}
              precision={0.5}
            />
            <Typography variant="subtitle1" component="span" fontWeight={700}>
              以上
            </Typography>
          </Stack>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            padding: "20px 0",
          }}
        >
          {!isLoading && data ? (
            data.stores.map((store) => {
              return (
                <Grid item key={store.id} xs={2} sm={4} md={4}>
                  <StoreCard store={store} key={store.id} />
                </Grid>
              );
            })
          ) : (
            <Skeleton
              variant="rounded"
              width={"90%"}
              height={"70vh"}
              sx={{
                margin: "auto",
                marginTop: "5vmin",
              }}
            />
          )}
        </Grid>
        <Pagination
          count={Math.floor((Number(data?.total ?? 1) - 1) / take) + 1}
          onChange={handlePagination}
          page={cursor / take + 1}
        />
      </Box>
    </Container>
  );
};

export default ProductLayout;
