import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Sidebar = () => {
  const [productName, setProductName] = useState<string>("");

  return (
    <>
      <SubHeader>
        <RightContainer>
          <SearchBox>
            <span>
              <SearchIcon />
            </span>
            <SearchInput
              placeholder="Search for products"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <SearchBtn>Search</SearchBtn>
          </SearchBox>
        </RightContainer>
      </SubHeader>
    </>
  );
};

const SubHeader = styled.div`
  display: flex;
  background-color: #9c94b0;
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

const SearchBox = styled.div`
  position: relative;
  color: #888;
  span,
  button {
    position: absolute;
    top: 0;
    padding: 14px 24px;
    font-size: 16px;
    height: 100%;
  }
`;

const SearchInput = styled.input`
  line-height: 52px;
  padding: 0 112px 0 72px;
  width: 100%;
  font-size: 16px;
  border-radius: 7px;
  font-weight: 500;
`;

const SearchBtn = styled.button`
  right: 0;
  font-size: 14px;
  font-weight: 600;
  background-color: #fe6b6a;
  color: #fff;
  border-radius: 0 7px 7px 0;
  cursor: pointer;
  :hover {
    background-color: #0a011b;
  }
`;

export default Sidebar;
