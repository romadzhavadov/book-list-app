import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <StyledLink href="https://github.com/romadzhavadov" target="_blank" rel="noopener noreferrer">
        GitHub
      </StyledLink>
    </StyledFooter>
  );
};

// Styled-components
const StyledFooter = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background: #1e3a8a;
`;

const StyledLink = styled.a`
  color:rgb(255, 255, 255);
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(213, 191, 103);
  }
`;

export default Footer;