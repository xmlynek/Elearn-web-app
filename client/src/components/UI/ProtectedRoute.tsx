import { useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useLangTranslation from '../../hooks/useLangTranslation';
import { UserRole } from '../../models/User';
import AuthContext from '../../store/auth-context';

type Props = {
  redirectPath?: string;
  requiredRole?: UserRole[];
};

const ProtectedRoute: React.FC<Props> = (props) => {
  const location = useLocation();
  const translations = useLangTranslation();
  const authCtx = useContext(AuthContext);

  const isAuthenticated = authCtx.isLoggedIn;
  const userRole = authCtx.user?.role;

  if (
    (isAuthenticated &&
      userRole &&
      props.requiredRole &&
      props.requiredRole.includes(userRole)) ||
    (!props.requiredRole &&
      isAuthenticated &&
      userRole &&
      Object.values(UserRole).includes(userRole))
  ) {
    return <>{props.children}</>;
  }

  if (
    isAuthenticated &&
    userRole &&
    props.requiredRole &&
    !props.requiredRole.includes(userRole)
  ) {
    return (
      <div className="centered h4 mt-5">
        <p>
          {translations?.unauthorizedErr}
          <br />
          <Link className="d-block mt-3" to={'/'}>
            {translations?.redirectToHomepageLabel}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Navigate
      state={{ from: location }}
      to={props.redirectPath ? props.redirectPath : '/login'}
    />
  );
};

export default ProtectedRoute;
