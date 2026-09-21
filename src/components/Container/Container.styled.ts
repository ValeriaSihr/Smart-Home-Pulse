import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  margin: 0 auto;
  padding: 0 16px;
  /* Mobile styles */
  @media screen and (max-width: 767px) {
    padding: 0 12px;
  }
  
  /* Laptop styles */
  @media screen and (min-width: 1025px) and (max-width: 1280px) {
    max-width: 1024px;
    padding: 0 22px;
  }
  
  /* Desktop styles */
  @media screen and (min-width: 1281px) {
    max-width: 1440px;
    padding: 0 24px;
  }
`;
