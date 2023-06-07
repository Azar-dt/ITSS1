import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import styled from "styled-components";
import photoURL from "../public/bicycle_1.png";
import { useState } from "react";

const ProductLayout = () => {
  const [cateId, setCateId] = useState<string>("0");

  const product = {
    id: "1",
    pname: "Store 1",
    photoURL,
    description: "description here",
    address: "Hai Ba Trung, Ha Noi",
    quantity: "10",
  };

  const filters = [
    {
      id: "1",
      name: "Gần nhất",
    },
    {
      id: "2",
      name: "Đang mở cửa",
    },
  ];

  return (
    <div>
      <SortItem>
        並べ替え
        <SortBtn>関連</SortBtn>
        <SortBtn>値段</SortBtn>
      </SortItem>
      <MainContainer>
        <FilterContainer>
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
        </FilterContainer>
        <ProductContainer>
          {/* <Link key={product.id} href={`/product/${product.id}`}> */}
          <ProductItem>
            <ProductImage>
              <Image
                src={product.photoURL}
                alt="product image"
                width={222}
                height={300}
              />
            </ProductImage>
            <ProductDescription>
              <h5>{product.pname}</h5>
              <ProductStar>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
              </ProductStar>
              <ProductInfo>
                <h4>{product.address}</h4>
              </ProductInfo>
            </ProductDescription>
          </ProductItem>
          {/* </Link> */}
          <ProductItem>
            <ProductImage>
              <Image
                src={product.photoURL}
                alt="product image"
                width={222}
                height={300}
              />
            </ProductImage>
            <ProductDescription>
              <h5>{product.pname}</h5>
              <ProductStar>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
              </ProductStar>
              <ProductInfo>
                <h4>{product.address}</h4>
              </ProductInfo>
            </ProductDescription>
          </ProductItem>
          <ProductItem>
            <ProductImage>
              <Image
                src={product.photoURL}
                alt="product image"
                width={222}
                height={300}
              />
            </ProductImage>
            <ProductDescription>
              <h5>{product.pname}</h5>
              <ProductStar>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
                <span>
                  <StarRateIcon />
                </span>
              </ProductStar>
              <ProductInfo>
                <h4>{product.address}</h4>
              </ProductInfo>
            </ProductDescription>
          </ProductItem>
        </ProductContainer>
      </MainContainer>
    </div>
  );
};

const MainContainer = styled.div``;

const FilterContainer = styled.div``;

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

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 32px 28px;
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

const SortItem = styled.div`
  position: relative;
  font-size: 18px;
  font-weight: 600;
  background-color: #bbbbbb;
  padding: 10px;
  margin: 10px;
  span,
  button {
    /* position: absolute; */
    top: 0;
    padding: 5px 24px;
    margin: 0 10px;
    font-size: 16px;
    /* height: 100%; */
  }
`;

const ProductItem = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 30px 12px;
  margin-left: 280px;
  border: 1px solid #84dd92;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 16px 16px 30px rgba(0, 0, 0, 0.02);
  /* margin: 15px 0; */
  transition: all 0.2s ease;
  :hover {
    background-color: #63dd75;
  }
`;

const ProductImage = styled.div`
  flex-shrink: 0;
  img {
    object-fit: cover;
    border-radius: 20px;
  }
`;

const ProductDescription = styled.div`
  flex: 1;
  text-align: start;
  padding: 10px 0;
  span {
    color: #606063;
    font-size: 12px;
  }
  h5 {
    padding-top: 7px;
    color: #1a1a1a;
    font-size: 14px;
  }
`;

const ProductStar = styled.div`
  span {
    color: rgb(240, 225, 18);
  }
  margin-bottom: 16px;
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  h4 {
    padding-left: 7px;
    padding-bottom: 4px;
    font-size: 15px;
    font-weight: 700;
    color: #088178;
  }
`;

export default ProductLayout;
