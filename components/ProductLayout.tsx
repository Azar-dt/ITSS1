import Image from "next/image";
import styled from "styled-components";
import photoURL from "../public/bicycle_1.png";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

const ProductLayout = () => {
  const [cateId, setCateId] = useState<string>("0");
  const [value, setValue] = useState<number | null>(2);
  const product = {
    id: "1",
    sname: "Store name 1",
    photoURL,
    description: "description here",
    address: "Hai Ba Trung, Ha Noi",
    quantity: "10",
  };

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
    <div>
      <SortItem>
        並べ替え
        <SortBtn>関連</SortBtn>
        <SortBtn>値段</SortBtn>
        <SortBtn>距離</SortBtn>
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
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.sname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description} <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {5} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
          </ProductItem>
          
          {/* </Link> */}
          <ProductItem>
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Store名
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Store <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {4} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
          </ProductItem>
          <ProductItem>
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Store名
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Store <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {3} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
          </ProductItem>
          <ProductItem>
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Store名
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Store <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {3} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
          </ProductItem>
          <ProductItem>
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Store名
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Store <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {3} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
          </ProductItem>
          <ProductItem>
            <Card sx={{ maxWidth: 305, borderRadius: '25px', padding: '30px 12px' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="120"
                image={product.photoURL.src}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Store名
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description of Store <br/><br/>
                  Address:{product.address}
                </Typography>
              </CardContent>
              <Typography component="legend">評価</Typography>
              <Rating name="read-only" value = {3} readOnly />
              <CardActions>
                <Button size="small" sx ={{  marginLeft: '90px'}}>もっと見る</Button>
              </CardActions>
            </Card>
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
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  margin-left:150px;
  cursor: pointer;
  box-shadow: 16px 16px 30px rgba(0, 0, 0, 0.02);
  /* margin: 15px 0; */
  transition: all 0.2s ease;
  :hover {
    background-color: #d4e8d7;
  }
`;

export default ProductLayout;
