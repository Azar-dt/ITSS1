import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

type Props = {};

export const FilterList: React.FC<Props> = ({}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
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
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="一番近い" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="距離１Km以下" />
        </ListItemButton>
      </List>
    </Box>
  );
};
