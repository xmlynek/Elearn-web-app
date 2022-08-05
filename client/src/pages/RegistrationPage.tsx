import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import UserForm from '../components/users/UserForm';
import useLangTranslation from '../hooks/useLangTranslation';
import AuthContext from '../store/auth-context';

const RegistrationPage: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const translations = useLangTranslation();
  const { isLoggedIn, user, resetStateVariables } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    resetStateVariables();
    if (isLoggedIn && user) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate, resetStateVariables]);

  return (
    <section className="logreg-container">
      <h3 className="text-center">{translations?.registrationNavbarHeader}</h3>
      <UserForm
        registration={true}
        onSubmitText={translations?.registrationSubmitButtonTitle}
        onSubmit={(val: any) => {
          authContext.register({
            firstname: val.firstname,
            lastname: val.lastname,
            confirmPassword: val.confirmPassword,
            password: val.password,
            email: val.email,
          });
        }}
      />
      <div className="mt-4 text-center">
        <p>
          {translations?.alreadyRegisteredQuestion}
          <Link to={'/login'} className="ms-2">
            {translations?.logInLabel}
          </Link>
        </p>
      </div>
      {authContext.error !== '' && (
        <div className="centered h4 error-msg">
          <p>{authContext.error}</p>
        </div>
      )}
      {authContext.isLoading && authContext.error === '' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default RegistrationPage;
