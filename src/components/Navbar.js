import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCat } from 'react-icons/fa'; 
import '../App.css'; 

function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      bg="primary"
      sticky="top"
      className="shadow-sm"
      style={{
        background:
          'linear-gradient(90deg, rgba(29, 151, 108, 1) 0%, rgba(147, 249, 185, 1) 100%)',
      }}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <FaCat size={30} className="me-2" /> 
          <span className="fw-bold text-black">Cat Gallery</span> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="bg-light" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={NavLink}
              to="/easy"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active text-black fw-bold'
                  : 'nav-link text-black'
              }
            >
              Easy
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/medium"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active text-black fw-bold'
                  : 'nav-link text-black'
              }
            >
              Medium
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/hard"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active text-black fw-bold'
                  : 'nav-link text-black'
              }
            >
              Hard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
