import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import Auth from '../utils/auth';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faUser, faArrowRightFromBracket, faBars} from '@fortawesome/free-solid-svg-icons'

const AppNavbar = () => {

  return (
<>
      <Nav className="navbar navbar-expand-lg navbar-light">
      <Container fluid>
      <Navbar.Brand as={Link} className="text-white ml-3" to='/'>Logo</Navbar.Brand>

        {/*Navbar collapse and expand */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navBarResponsive" aria-controls="navBarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span id='hamburgerIcon'><FontAwesomeIcon icon={faBars} /></span>
    </button>
    <div className="collapse navbar-collapse" id="navBarResponsive">

        <Nav className="navbar-nav ml-auto mb-2 mb-lg-0">

          <NavLink as={Link} className="ml-3 my-2" to='/' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white',})}>
            Home</NavLink>
          <NavLink as={Link} className="ml-3 my-2" to='/about' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white',})}>About</NavLink>

          {/*Only show if user logged in*/}
          {Auth.loggedIn() ? ( 
            <>

          <NavLink as={Link} className="ml-3 my-2" to='/profile' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white',})}><FontAwesomeIcon icon={faUser} /> Profile</NavLink>
          
          <Button className='btn btn-dark ml-3 col-3 col-sm-2 col-lg-auto' onClick={Auth.logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</Button>
          </>
           ) : (
             <>
             {/*Show if user not logged in*/}
          <NavLink className="ml-3 my-2" as={Link} to='/login' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white',})}><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>

          <NavLink className="ml-3 my-2" as={Link} to='/signup' style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white',})}><FontAwesomeIcon icon={faUser} /> Sign Up</NavLink>
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