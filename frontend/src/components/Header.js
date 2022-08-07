import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { Navbar, Nav, Container, Button } from "react-bootstrap";

const Header = () => {
  const email = window.localStorage.getItem("userEmail");
  console.log(email);
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userEmail")) setIsAuth(true);
  }, []);

  return (
    <header>
      <Navbar  variant="dark" expand="lg" collapseOnSelect style={{backgroundColor:'#069694'}}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <b>Doctor's</b>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              {/* <LinkContainer to="/logout">
                <Nav.Link>
                  <i className="fas fa-user"></i> about 
                </Nav.Link>
              </LinkContainer> */}
              {isAuth ? (
                <>
                  <LinkContainer to="/dashboard">
                    <Nav.Link>
                      <i className="fas fa-user"> Dashboard</i>
                    </Nav.Link>
                  </LinkContainer>
                  {/* <LinkContainer to="/prescribe">
                    <Nav.Link>
                      <i className="fas fa-user"> Prescribe</i>
                    </Nav.Link>
                  </LinkContainer> */}

                  <Nav.Link>
                    <i
                      className="fas fa-user"
                      onClick={() => {
                        window.localStorage.removeItem("userEmail");
                        window.localStorage.setItem("reload", true);
                        navigate("/");
                      }}
                    > Sign out</i>
                  </Nav.Link>
                </>
              ) : (
                <>
                <LinkContainer to="/appointment">
                <Nav.Link>
                  <i className="fas fa-calendar-alt"> Appointment</i>
                </Nav.Link>
              </LinkContainer>
                <LinkContainer to="/reschedule">
                <Nav.Link>
                  <i className="fas fa-calendar-check"> Reschedule</i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/patientLogin">
                  <Nav.Link>
                    <i className="fas fa-user-plus"> Register</i>
                  </Nav.Link> 
                </LinkContainer>
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <i className="fas fa-user"> Sign in</i>
                  </Nav.Link>
                </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
