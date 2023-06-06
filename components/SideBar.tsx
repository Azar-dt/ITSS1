import Image from "next/image";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
// import curImg from "../public/vercel.svg"
// import {
//   ChangeEvent,
//   Dispatch,
//   MouseEventHandler,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import axios from "axios";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import { ToastContext } from "../contexts/ToastContext";
// import { Product } from "../types";

// interface SideBarProps {
//   productsData: Product[];
//   setProductsCallback: Dispatch<any>;
// }

const Sidebar = () => {
  const [cateId, setCateId] = useState<string>("0");
  const [productName, setProductName] = useState<string>("");
  
  const filters = [
    {
      id: "1",
      name: "Gần nhất",
    },
    {
        id: "1",
        name: "Đang mở cửa",
      },
  ];

  return (
    <>
      <SubHeader>
        <LeftContainer>
          <CategoryDepartment>
            <HeadDepartment>
              <div>検索フィルター</div>
            </HeadDepartment>
            <MenuDepartment>
              <ul>
                {filters.map((filter) => (
                  <li key={filter.id} onClick={() => setCateId(filter.id)}>
                    <CategoryBox>
                      <span>{filter.name}</span>
                    </CategoryBox>
                  </li>
                ))}
              </ul>
            </MenuDepartment>
          </CategoryDepartment>
        </LeftContainer>
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
            <SearchBtn >Search</SearchBtn>
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
`;

const LeftContainer = styled.div``;

const CategoryDepartment = styled.div`
  position: relative;
  z-index: 10;
  bottom: -24px;
`;

const HeadDepartment = styled.div`
  position: relative;
  width: 300px;
  padding: 12px 24px;
  background-color: #5d60e8;
  border-radius: 7px 7px 0 0;
  color: #fff;
`;


const MenuDepartment = styled.div`
  position: absolute;
  top: 100%;
  width: 300px;
  background-color: #fff;
  border: 1px solid #888;
  border-top: 0;
  border-bottom: 0;
  li {
    font-weight: 600;
    border-bottom: 1px solid #888;
    :hover {
      background-color: #888;
      color: #fff;
    }
  }
`;

const CategoryBox = styled.div`
  cursor: pointer;
  height: 46px;
  font-size: 16px;
  align-items: center;
  padding: 10px 24px;
`;

const RightContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin-left: auto;
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
