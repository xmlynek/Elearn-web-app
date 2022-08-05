import { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserRole } from "../../models/User";
import AuthContext from "../../store/auth-context";
import ProtectedComponent from "../UI/ProtectedComponent";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to={"/welcome"}>
            Ultra-Wideband
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/topics"} eventKey={1}>
                Zoznam topikov
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/videos"} eventKey={2}>
                Vzdelávacie videá
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/tests"} eventKey={3}>
                Testovanie vedomostí
              </Nav.Link>
              <ProtectedComponent requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}>
                <Nav.Link as={NavLink} to={"/users"} eventKey={4}>
                  Používatelia
                </Nav.Link>
              </ProtectedComponent>
            </Nav>
            <Nav>
              <Nav.Link
                eventKey={1}
                as={NavLink}
                to={authCtx.isLoggedIn ? "/profile" : "/register"}
              >
                {authCtx.isLoggedIn ? "Používateľský profil" : "Registrácia"}
              </Nav.Link>
              {authCtx.isLoggedIn ? (
                <Nav.Link eventKey={5} onClick={authCtx.logout}>
                  {"Odhlásiť"}
                </Nav.Link>
              ) : (
                <Nav.Link eventKey={6} as={NavLink} to={"/login"}>
                  Prihlásenie
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default MainNavigation;
