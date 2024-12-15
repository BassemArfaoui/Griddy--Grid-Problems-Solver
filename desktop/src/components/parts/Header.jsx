import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Grid } from 'lucide-react'; 
import {Link , useLocation} from 'react-router-dom';

function Header() {
  const location = useLocation();
  return (
    <header className="w-100 position-fixed z-3 p-0" style={{ backgroundColor: location.pathname==='/' ? 'white' :  '#e0e0e065' }}> 
      <Navbar bg="transparent" variant="dark" className="border-bottom border-3 px-0">
        <Container fluid className="px-0 ps-4 pe-4"> 
            <Grid className="text-success" style={{ width: 35, height: 35 }} />
            <Link to='/' className="text-decoration-none py-1" ><span className="ms-2 text-success fs-3 fw-bold">Griddy</span></Link>
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link href="#" className="text-dark fw-bold">About</Nav.Link>
              <Nav.Link href="#" className="text-dark fw-bold">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
