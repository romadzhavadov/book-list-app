import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <StyledHeader>
      <NavLink to="/">
        <Logo>Book List</Logo>
      </NavLink>
      <AddBookButton to={location.pathname === "/" ? "/add" : "/"}>
        {location.pathname === "/" ? "Add Book" : "Go to Dashboard"}
      </AddBookButton>
    </StyledHeader>
  );
};

// Styled-components
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #1e3a8a;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap; /* Дозволяє елементам переноситися на новий рядок при потребі */

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-size: 16px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #facc15;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AddBookButton = styled(Link)`
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid rgb(241, 240, 236); /* Колір бордера */
  color: rgb(241, 240, 236); /* Колір тексту */
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    background-color: rgb(213, 191, 103);
    color: #1e3a8a; /* Колір тексту при ховері */
    border-color: #1e3a8a; /* Колір бордера при ховері */
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 12px;
    margin-left: 8px;
  }
`;

export default Header;

