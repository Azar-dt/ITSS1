import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled as styledMui } from "@mui/material/styles";
import React from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

type Props = {
  storeName: string;
  setStoreName: (storeName: string) => void;
  setStoreAddress: (storeAddress: {
    longitude?: number;
    latitude?: number;
  }) => void;
};

const RedLocationOnIcon = styled(LocationOnIcon)`
  color: red;
`;

const SearchBar: React.FC<Props> = ({
  storeName,
  setStoreName,
  setStoreAddress,
}) => {
  const handleGetUserAddress = () => {
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
  };

  return (
    <SubHeader>
      <SearchContainer>
        <Search>
          <StyledInputBase
            placeholder="ストア検索"
            inputProps={{ "aria-label": "search" }}
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <IconButton
            aria-label="search"
            size="large"
            sx={{
              backgroundColor: "#1b65d4",
              // change hover color
              "&:hover": {
                backgroundColor: "#073b88",
              },
            }}
          >
            <SearchIcon
              fontSize="inherit"
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Search>
      </SearchContainer>
      <Button
        variant="contained"
        size="large"
        endIcon={<RedLocationOnIcon />}
        onClick={handleGetUserAddress}
      >
        位置
      </Button>
    </SubHeader>
  );
};

const Search = styledMui("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "32px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  backgroundColor: "#e4e4e4",
  "&:hover": {
    backgroundColor: "#ccc",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styledMui(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SubHeader = styled.div`
  display: flex;
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

export default SearchBar;
