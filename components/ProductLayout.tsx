import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { FilterList } from "./FilterList";
import { StoreCard } from "./StoreCard";
import photoURL from "../public/bicycle_1.png";

const ProductLayout = () => {
  // mock data
  const stores = [
    {
      id: "1",
      name: "Store name 1",
      photoURL: photoURL.src,
      description: "description here ad",
      address: "Hai Ba Trung, Ha Noi s",
      quantity: "10",
      rating: 3,
    },
    {
      id: "2",
      name: "Store name 3",
      photoURL: photoURL.src,
      description: "description here adf",
      address: "Hai Ba Trung, Ha Noi sdf",
      quantity: "10",
      rating: 5,
    },
    {
      id: "2",
      name: "Store name 4",
      photoURL: photoURL.src,
      description: "description here adsfg",
      address: "Hai Ba Trung, Ha Noi sfd",
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
          {stores.map((store) => {
            return (
              <Grid item key={store.id} xs={2} sm={4} md={4}>
                <StoreCard store={store} key={store.id} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination count={10} />
      </Box>
    </Container>
  );
};

export default ProductLayout;
