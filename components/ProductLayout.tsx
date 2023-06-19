import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  data: {
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
};

const ProductLayout: React.FC<Props> = ({
  data,
  cursor,
  setCursor,
  take,
  setStoreAddress,
  setRadius,
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
            backgroundColor: "#ccc",
            width: "100%",
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
            <Button variant="contained" color="inherit">
              関連
            </Button>
            <Button variant="contained" color="inherit">
              値段
            </Button>
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
          {data.stores.map((store) => {
            return (
              <Grid item key={store.id} xs={2} sm={4} md={4}>
                <StoreCard store={store} key={store.id} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={(data.total - 1) / take + 1}
          onChange={handlePagination}
          page={cursor / take + 1}
        />
      </Box>
    </Container>
  );
};

export default ProductLayout;
