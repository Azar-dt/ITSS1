import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Collapse,
  Container,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import { Bike, BikeType } from "@prisma/client";
import * as React from "react";
import { BikeList } from "./BikeList";

export const BIKE_TYPES = [
  {
    name: BikeType.OFF_ROAD,
  },
  {
    name: BikeType.CC150,
  },
  {
    name: BikeType.BIG_DISPLACEMENT,
  },
  {
    name: BikeType.CC50,
  },
  {
    name: BikeType.CC125,
  },
  {
    name: BikeType.MANUAL,
  },
  {
    name: BikeType.SCOOTER,
  },
];

type Props = {
  data: {
    total: number;
    bikes: Bike[];
  };
  isLoading: boolean;
  cursor: number;
  setCursor: (cursor: number) => void;
  take: number;
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
  selectedIndex: number;
  price: number | undefined;
  setPrice: (price: number | undefined) => void;
};

const StoreBikeList: React.FC<Props> = ({
  data,
  isLoading,
  cursor,
  setCursor,
  take,
  handleListItemClick,
  selectedIndex,
  price,
  setPrice,
}) => {
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
          <Box
            sx={{
              maxWidth: 200,
              border: "1px solid #ccc",
              borderRadius: "8px",
              height: "max-content",
              flexGrow: 1,
              marginLeft: "-10vmin",
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
              <span>
                <FilterAltIcon
                  style={{ color: "#aaa", marginLeft: "2px", marginTop: "3px" }}
                />
              </span>
            </Typography>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                selected={selectedIndex === -1}
                onClick={(event) => handleListItemClick(event, -1)}
              >
                <ListItemText primary="バイクの種類別" />
              </ListItemButton>
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {BIKE_TYPES.map((type, index) => (
                    <ListItemButton
                      key={type.name}
                      sx={{ pl: 4 }}
                      selected={selectedIndex === index}
                      onClick={(event) => handleListItemClick(event, index)}
                    >
                      <ListItemText primary={type.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
              <Divider />
              <ListItemButton
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <ListItemText
                  primary="値段"
                  sx={{
                    width: "max-content",
                  }}
                />
                <TextField
                  variant="standard"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{"≤"}</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">VND</InputAdornment>
                    ),
                  }}
                />
              </ListItemButton>
            </List>
          </Box>
        </Container>
      </Grid>
      <Grid item xs={9} sx={{ background: "#F7F4F4", marginTop: 1 }}>
        {data?.total !== 0 ? (
          <BikeList
            data={data}
            isLoading={isLoading}
            cursor={cursor}
            setCursor={setCursor}
            take={take}
          />
        ) : (
          <Box
            p={2}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                paddingBottom: "20px",
              }}
            >
              バイクがありません
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
export default StoreBikeList;
