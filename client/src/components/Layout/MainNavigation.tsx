import { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../models/User';
import AuthContext from '../../store/auth-context';
import ProtectedComponent from '../UI/ProtectedComponent';

import gbFlag from '../../assets/icons/gb.svg';
import skFlag from '../../assets/icons/sk.svg';
import LanguageContext, { Language } from '../../store/lang-context';
import useLangTranslation from '../../hooks/useLangTranslation';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LanguageContext);

  const translations = useLangTranslation();

  return (
    <nav>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to={'/welcome'}>
            Ultra-Wideband
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={'/topics'} eventKey={1}>
                {translations?.topicListNavbarHeader}
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/videos'} eventKey={2}>
                {translations?.videoListNavbarHeader}
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/tests'} eventKey={3}>
                {translations?.testListNavbarHeader}
              </Nav.Link>
              <ProtectedComponent
                requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}
              >
                <Nav.Link as={NavLink} to={'/users'} eventKey={4}>
                  {translations?.userListNavbarHeader}
                </Nav.Link>
              </ProtectedComponent>
            </Nav>
            <Nav>
              <Nav.Link
                eventKey={1}
                as={NavLink}
                to={authCtx.isLoggedIn ? '/profile' : '/register'}
              >
                {authCtx.isLoggedIn
                  ? translations?.userProfileNavbarHeader
                  : translations?.registrationNavbarHeader}
              </Nav.Link>
              {authCtx.isLoggedIn ? (
                <Nav.Link eventKey={5} onClick={authCtx.logout}>
                  {translations?.logoutNavbarHeader}
                </Nav.Link>
              ) : (
                <Nav.Link eventKey={6} as={NavLink} to={'/login'}>
                  {translations?.loginNavbarHeader}
                </Nav.Link>
              )}
              <Nav.Link>
                <img
                  src={gbFlag}
                  alt="xd"
                  height={25}
                  className="me-2"
                  onClick={langCtx.setLanguage.bind(null, Language.EN)}
                />
                <img
                  src={skFlag}
                  alt="xd"
                  height={25}
                  onClick={langCtx.setLanguage.bind(null, Language.SK)}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
};

export default MainNavigation;
