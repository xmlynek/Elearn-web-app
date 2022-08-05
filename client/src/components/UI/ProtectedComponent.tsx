import { useContext } from "react";
import { UserRole } from "../../models/User";
import AuthContext from "../../store/auth-context";

type Props = {
  requiredRole: UserRole[];
};

const ProtectedComponent: React.FC<Props> = (props) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const userRole = user?.role;

  return (
    <>
      {userRole && isLoggedIn && props.requiredRole?.includes(userRole)
        ? props.children
        : null}
    </>
  );
};

export default ProtectedComponent;
