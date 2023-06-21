import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Collapse,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import * as React from "react";
import { BikeList } from "./BikeList";

type Props = {
  storeId: string;
};

const NOW = "2023-06-21T09:26:40.759Z";

const DEFAULT_IMG =
  // eslint-disable-next-line max-len
  "https://i.pinimg.com/originals/ab/f6/93/abf6931a2219d89bce1a5ee9fb1d6daa.jpg";

const DATA: {
  total: number;
  bikes: Bike[];
} = {
  total: 10,
  bikes: [
    {
      id: 1,
      storeId: 1,
      name: "Bike 1",
      price: 1,
      type: "CC150",
      rating: 5,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 2,
      storeId: 1,
      name: "Bike 2",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 3,
      storeId: 1,
      name: "Bike 3",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 4,
      storeId: 1,
      name: "Bike 4",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 5,
      storeId: 1,
      name: "Bike 5",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 6,
      storeId: 1,
      name: "Bike 6",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 7,
      storeId: 1,
      name: "Bike 7",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 8,
      storeId: 1,
      name: "Bike 8",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 9,
      storeId: 1,
      name: "Bike 9",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
    {
      id: 10,
      storeId: 1,
      name: "Bike 10",
      price: 1,
      type: "CC150",
      rating: 4,
      createdAt: new Date(NOW),
      updatedAt: new Date(NOW),
      imgUrl: DEFAULT_IMG,
    },
  ],
};

const StoreBikeList: React.FC<Props> = ({ storeId }) => {
  const [cursor, setCursor] = React.useState(0);
  const take = 6;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    console.log(index);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Container
          style={{
            display: "flex",
            margin: "16px 20px",
            justifyContent: "center",
          }}
        >
          <span>
            <FilterAltIcon style={{ color: "#aaa" }} />
          </span>
          <Box
            sx={{
              maxWidth: 200,
              border: "1px solid #ccc",
              borderRadius: "8px",
              height: "max-content",
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              component="div"
              sx={{
                flexGrow: 1,
                padding: "10px",
                display: "flex",
                justifyContent: "start",
              }}
            >
              フィルター
            </Typography>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton>
                <ListItemText primary="バイクの種類別" />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                  >
                    <ListItemText primary="Off road" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="CC150" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Big displacement" />
                  </ListItemButton>

                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 4)}
                  >
                    <ListItemText primary="CC50" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 5)}
                  >
                    <ListItemText primary="CC125" />
                  </ListItemButton>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 6)}
                  >
                    <ListItemText primary="Manual" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Divider />
              <ListItemButton>
                <ListItemText primary="値段" />
              </ListItemButton>
            </List>
          </Box>
        </Container>
      </Grid>
      <Grid item xs={9} sx={{ background: "#cdcdcd", marginTop: 1 }}>
        <BikeList
          data={{
            ...DATA,
            bikes: DATA.bikes.slice(cursor, cursor + take),
          }}
          cursor={cursor}
          setCursor={setCursor}
          take={take}
        />
      </Grid>
    </Grid>
  );
};
export default StoreBikeList;
