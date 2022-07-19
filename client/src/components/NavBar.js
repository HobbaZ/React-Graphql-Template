import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container} from 'react-bootstrap';
import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faUser, faArrowRightFromBracket, faBars} from '@fortawesome/free-solid-svg-icons'

const AppNavbar = () => {

  return (
    <>

<Nav className="navbar navbar-expand-lg navbar-light">
  <Container fluid>
  <Navbar.Brand as={Link} className="text-white ml-3" to='/'>Logo</Navbar.Brand>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
      <span id = "hamburgerIcon"><FontAwesomeIcon icon={faBars} /></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarToggler">
    
      <Nav className="navbar-nav ml-auto mb-2 mb-lg-0">
      <NavLink as={Link} className="ml-3 text-center navLink"
       style={({ isActive }) => ({
        color: isActive ? 'yellow' : 'white',
      })} 
      to='/'>Home</NavLink>

      <NavLink as={Link} className="ml-3 text-center navLink"
      style={({ isActive }) => ({
        color: isActive ? 'yellow' : 'white',
      })}
      to='/about'>About</NavLink>

      {/* if user is logged in show profile and logout tabs*/}
      {Auth.loggedIn() ? (
              <>
                <NavLink as={Link} className="ml-3 text-center navLink"
                style={({ isActive }) => ({
                  color: isActive ? 'yellow' : 'white',
                })}
                to='/profile'><FontAwesomeIcon icon={faUser} /> Profile</NavLink>

                <NavLink onClick={Auth.logout} className="ml-3 text-center navLink"
                style={({ isActive }) => ({
                  color: isActive ? 'yellow' : 'white',
                })}
                ><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</NavLink>
              </>
            ) : (
              
              <>
            {/*Else show login and signup links*/}
              <NavLink as={Link} className="ml-3 text-center navLink"
              style={({ isActive }) => ({
                color: isActive ? 'yellow' : 'white',
              })}
              to='/login'><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>

              <NavLink as={Link} className="ml-3 text-center navLink"
              style={({ isActive }) => ({
                color: isActive ? 'yellow' : 'white',
              })}
              to='/signup'><FontAwesomeIcon icon={faUser} /> Sign Up</NavLink>
          </>
            )}
      </Nav>

    </div>
  </Container>
</Nav>

    </>
  );
};

export default AppNavbar;