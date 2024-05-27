/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import "../../Styles/Login/Login.css"

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted fontGeneral">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1 fontGeneral"
                  href="https://www.creative-tim.com?ref=adr-auth-footer"
                  target="_blank"
                >
                  Construred
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    className="fontGeneral"
                    href="https://www.creative-tim.com?ref=adr-auth-footer"
                    target="_blank"
                  >
                    Construred
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fontGeneral"
                    href="https://www.creative-tim.com/presentation?ref=adr-auth-footer"
                    target="_blank"
                  >
                    Sobre nosotros
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fontGeneral"
                    href="http://blog.creative-tim.com?ref=adr-auth-footer"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fontGeneral"
                    href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-auth-footer"
                    target="_blank"
                  >
                    Licencia
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
