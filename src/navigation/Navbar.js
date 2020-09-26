import React from 'react';
import './Navbar.css';
import { Navbar, Nav} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import EXL from './exl.png'

const Navigation = (props) => {
    console.log(props);
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/"><img src={EXL} width="100" height="60" alt="data"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/rules-setup">Rules Setup</Nav.Link>
                    <Nav.Link href="/letter-intake">Letter Intake</Nav.Link>
                    <Nav.Link href="/letter-search">Letter Search</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);