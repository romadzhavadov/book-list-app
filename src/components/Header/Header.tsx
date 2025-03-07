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
      <AddBookButton to={location.pathname === "/add" ? "/" : "/add"}>
        {location.pathname === "/add" ? "Go to Dashboard" : "Add Book"}
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
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
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
`;

const AddBookButton = styled(Link)`
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid rgb(241, 240, 236);  /* Колір бордера */
  color:  rgb(241, 240, 236);  /* Колір тексту */
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    background-color:rgb(213, 191, 103);
    color: #1e3a8a;  /* Колір тексту при ховері */
    border-color: #1e3a8a;  /* Колір бордера при ховері */
  }
`;

export default Header;

