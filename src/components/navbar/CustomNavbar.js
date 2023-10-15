import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import eliislogo from '../../img/eliislogo.png';
import './CustomNavbar.css';
import Icon from '@mdi/react';
import {
  mdiBell,
  mdiBullhorn,
  mdiMessageText,
  mdiCalendarBlank,
  mdiCloud,
} from '@mdi/js';

const buttonData = [
  { icon: mdiBell, text: 'Button 1' },
  { icon: mdiBullhorn, text: 'Button 2' },
  { icon: mdiMessageText, text: 'Button 3' },
  { icon: mdiCalendarBlank, text: 'Button 4' },
  { icon: mdiCloud, text: 'Button 5' },
];

function CustomNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={eliislogo} width="90" height="30" alt="Eliis" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <Form className="d-flex">
            {buttonData.map((button, index) => (
              <Button
                key={index}
                variant="warning"
                className="rounded-circle navbar-button"
                size="sm"
              >
                <Icon path={button.icon} size={1} />
              </Button>
            ))}
            <div>
              <div>Eliis Õpetaja</div>
              <a href="">Lasteaed ELIIS</a>
            </div>
            <Button
              variant="success"
              className="rounded-circle navbar-button"
              size="sm"
            >
              E Õ
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
