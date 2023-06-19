"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductLayout from "@/components/ProductLayout";
import SearchBar from "@/components/SearchBar";
import fetcher from "@/libs/fetcher";
import { Skeleton } from "@mui/material";
import { Store } from "@prisma/client";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

type StoreAddress = {
  longitude?: number;
  latitude?: number;
};

export default function Home() {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState<StoreAddress>({});
  const [cursor, setCursor] = useState(0);
  const take = 2;
  const [rate, setRate] = useState(0);
  const [radius, setRadius] = useState<number | null>(null);
  const { data, isLoading } = useSWR<{
    total: number;
    stores: Store[];
  }>(
    // eslint-disable-next-line max-len
    `/api/store?cursor=${cursor}&take=${take}&name=${storeName}&rate=${rate}&longitude=${
      storeAddress.longitude ?? ""
    }&latitude=${storeAddress.latitude ?? ""}&radius=${radius ?? ""}`,
    fetcher
  );

  return (
    <>
      <Header />
      <Container>
        <SearchBar
          storeName={storeName}
          setStoreName={setStoreName}
          setStoreAddress={setStoreAddress}
        />
        {!isLoading && data ? (
          <ProductLayoutSection>
            <ProductLayout
              data={data}
              cursor={cursor}
              setCursor={setCursor}
              take={take}
              setStoreAddress={setStoreAddress}
              setRadius={setRadius}
            />
          </ProductLayoutSection>
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100vh" />
        )}
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const ProductLayoutSection = styled.div`
  text-align: center;
  left: 100px;
  padding: 0 40px;
  margin-bottom: 40px;
  margin-top: 40px;
  h2 {
    margin: 20px 0;
    font-size: 28px;
  }
  p {
    color: #606063;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
