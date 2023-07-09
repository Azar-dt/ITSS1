import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import toast from "react-hot-toast";

type Props = {
  setStoreAddress: (storeAddress: {
    longitude?: number;
    latitude?: number;
  }) => void;
  setRadius: (radius: number | null) => void;
};
export const FilterList: React.FC<Props> = ({ setStoreAddress, setRadius }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (index === selectedIndex) {
      setSelectedIndex(0);
      setRadius(null);
      setStoreAddress({});
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStoreAddress({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => {
        toast.error(error.message);
      }
    );
    if (index === 1) setRadius(null);
    if (index === 2) setRadius(1);
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 200,
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "max-content",
        flexGrow: 1,
        marginLeft: "-55px",
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
        検索フィルター
      </Typography>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary="一番近い" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="距離１Km以下" />
        </ListItemButton>
      </List>
    </Box>
  );
};
