import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faUser, faArrowRightFromBracket, faBars} from '@fortawesome/free-solid-svg-icons'

const AppNavbar = () => {

  return (
      <Navbar className="navbar navbar-expand-lg">
      <Container fluid>
      <Navbar.Brand as={Link} className="text-white ml-3" to='/'>Logo</Navbar.Brand>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span id = "hamburgerIcon"><FontAwesomeIcon icon={faBars} /></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
        <Nav className="navbar-nav ml-auto mb-2 mb-lg-0">
          <NavLink as={Link} className="text-white ml-3" to='/'>Home</NavLink>
          <NavLink as={Link} className="text-white ml-3" to='/about'>About</NavLink>

          {/*Only show if user logged in*/}
          {Auth.loggedIn() ? ( 
            <>

          <NavLink as={Link} className="text-white ml-3" to='/profile'><FontAwesomeIcon icon={faUser} /> Profile</NavLink>
          
          <Button className="text-white ml-3" onClick={Auth.logout}> Logout</Button>
          </>
           ) : (
             <>
             {/*Show if user not logged in*/}
          <NavLink className="text-white ml-3" as={Link} to='/login'>Login</NavLink>

          <NavLink className="text-white ml-3" as={Link} to='/signup'>Sign Up</NavLink>
          </>
          )} 
          </Nav>
          </div> 
           </Container>
      </Navbar>
    
  );
};

export default AppNavbar;