import { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../../models/User";
import AuthContext from "../../store/auth-context";

type Props = {
  redirectPath?: string;
  requiredRole?: UserRole[];
};

const ProtectedRoute: React.FC<Props> = (props) => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const isAuthenticated = authCtx.isLoggedIn;
  const userRole = authCtx.user?.role;

  if (
    (isAuthenticated &&
      userRole &&
      props.requiredRole &&
      props.requiredRole.includes(userRole)) ||
    (!props.requiredRole && isAuthenticated && userRole && Object.values(UserRole).includes(userRole))
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
          Pre zobrazenie tejto stránky nemáte dostatočné oprávnenia!
          <br />
          <Link className="d-block mt-3" to={"/"}>Domovská stránka</Link>
        </p>
      </div>
    );
  }

  return <Navigate state={{from: location}} to={props.redirectPath ? props.redirectPath : "/login"} />;
};

export default ProtectedRoute;
