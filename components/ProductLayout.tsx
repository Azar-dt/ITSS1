import styled from "styled-components";
import photoURL from "../public/bicycle_1.png";
import { StoreCard } from "./StoreCard";
import { useState } from "react";
import Container from "@mui/material/Container";
import { FilterList } from "./FilterList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ProductLayout = () => {
  const [cateId, setCateId] = useState("1");

  //mock data
  const stores = [
    {
      id: "1",
      name: "Store name 1",
      photoURL: photoURL.src,
      description: "description here",
      address: "Hai Ba Trung, Ha Noi",
      quantity: "10",
      rating: 3,
    },
    {
      id: "2",
      name: "Store name 2",
      photoURL: photoURL.src,
      description: "description here",
      address: "Hai Ba Trung, Ha Noi",
      quantity: "10",
      rating: 5,
    },
    {
      id: "2",
      name: "Store name 2",
      photoURL: photoURL.src,
      description: "description here",
      address: "Hai Ba Trung, Ha Noi",
      quantity: "10",
      rating: 5,
    },
    {
      id: "2",
      name: "Store name 2",
      photoURL: photoURL.src,
      description: "description here",
      address: "Hai Ba Trung, Ha Noi",
      quantity: "10",
      rating: 1,
    },
    {
      id: "2",
      name: "Store name 2",
      photoURL: photoURL.src,
      description: "description here",
      address: "Hai Ba Trung, Ha Noi",
      quantity: "10",
      rating: 4,
    },
  ];

  const filters = [
    {
      id: "1",
      name: "一番近い",
    },
    {
      id: "2",
      name: "オープンしている",
    },
    {
      id: "3",
      name: "他の",
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <FilterList />
      <Box
        component={"div"}
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
            paddingTop: "20px",
          }}
        >
          {stores.map((store) => {
            return (
              <Grid item key={store.id} xs={2} sm={4} md={4}>
                <StoreCard store={store} key={store.id} />
              </Grid>
            );
          })}
        </Grid>
        {/* <Container>
          {stores.map((store) => {
            return <StoreCard store={store} key={store.id} />;
          })}
        </Container> */}
      </Box>
    </Container>
  );
};

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 32px 28px;
  margin-left: 200px;
  margin-right: 100px;
`;

const SortBtn = styled.button`
  font-size: 14px;
  font-weight: 600;
  background-color: #f3f4fa;
  color: #000000;
  border: #a3a1a1 1px solid;
  border-radius: 7px;
  cursor: pointer;
  :hover {
    background-color: #131392;
  }
`;

export default ProductLayout;
