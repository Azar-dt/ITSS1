"use client";

import Header from "@/components/header";
import Footer from "../components/Footer";
import Sidebar from "@/components/SideBar";
import ProductLayout from "@/components/ProductLayout";
import styled from "styled-components";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <ProductLayoutSection>
          <ProductLayout />
        </ProductLayoutSection>
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
