import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterDesc>
        <FooterContainer>
          <FooterText>
            <p>
              Powered by <span>EXODIA</span> - Designed by <span>SAKURA</span>
            </p>
          </FooterText>
        </FooterContainer>
      </FooterDesc>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: rgb(58, 58, 58);
  margin-top: 80px;
`;

const FooterContainer = styled.div`
  padding: 0 150px;
  p {
    color: rgb(136, 136, 136);
  }
  span {
    color: white;
    font-weight: bold;
  }
  @media (max-width: 1024px) {
    padding: 0 80px;
  }
`;

const FooterDesc = styled.div`
  background-color: rgb(43, 43, 43);
`;

const FooterText = styled.div`
  padding: 25px 80px;
  text-align: center;
`;

export default Footer;
