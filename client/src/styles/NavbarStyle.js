import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import '../app.css';

export const TitleNav = styled.span`
font-family: 'Fugaz One', cursive;
font-size: 50px;
width: 100%;
height: auto;
display: block;
`;

export const Nav = styled.nav`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid black;

`;

export const NavLayout = styled.div`
height: auto;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 5px;
align-items: center;
margin-bottom: 10px;

@media (max-width: 600px) {
  flex-direction: column;
  justify-content: center;
}
`;

export const NavLink = styled(Link)`
  color: black;
  margin: 0 auto;
  font-size: 25px;
  font-weight: 700;
  text-decoration: none;
  padding: 5px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const NavBtnLink = styled.button`
  align-items: center;
  width: 100px;
  background: rgba(255, 255, 255, 0);
  border: none;
  margin: 0 auto;
  font-size: 25px;
  font-weight: 700;
  text-decoration: none;
  padding: 10px;
  cursor: pointer;

  :active {
    color: rgb(255, 255, 255);
  }

  :hover {
      text-decoration: underline;
  }
`;
  