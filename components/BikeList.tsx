import { Grid, Pagination, Skeleton } from "@mui/material";
import { Bike } from "@prisma/client";
import React from "react";
import { BikeCard } from "./BikeCard";

type Props = {
  data?: {
    total: number;
    bikes: Bike[];
  };
  isLoading: boolean;
  cursor: number;
  setCursor: (cursor: number) => void;
  take: number;
};

const BikeList: React.FC<Props> = ({
  data,
  isLoading,
  cursor,
  setCursor,
  take,
}) => {
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCursor((value - 1) * take);
  };

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          padding: "20px 0",
        }}
      >
        {!isLoading && data ? (
          data.bikes.map((bike) => (
            <Grid
              item
              key={bike.id}
              xs={2}
              sm={4}
              md={4}
              sx={{
                backgroundColor: "#f1e8e8",
                height: "380px",
              }}
            >
              <BikeCard bike={bike} key={bike.id} />
            </Grid>
          ))
        ) : (
          <Skeleton variant="rectangular" height={300} />
        )}
      </Grid>
      <Pagination
        count={Math.floor((Number(data?.total) - 1) / take) + 1}
        onChange={handlePagination}
        page={Math.floor(cursor / take) + 1}
      />
    </div>
  );
};

export { BikeList };
