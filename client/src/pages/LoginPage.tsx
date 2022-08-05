import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import AuthContext from '../store/auth-context';

interface CustomizedState {
  from: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user, error, isLoading, login, resetStateVariables } =
    authContext;

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const from = state?.from?.pathname;

  useEffect(() => {
    resetStateVariables();
    if (isLoggedIn && user) {
      navigate(from ? from : '/', { replace: true });
    }
  }, [isLoggedIn, user, navigate, from, resetStateVariables]);

  return (
    <section className="logreg-container text-start">
      <h3 className="text-center">Prihlásenie</h3>
      <Formik
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Nesprávny formát emailu')
            .trim()
            .required('*Povinné'),
          password: Yup.string().required('*Povinné'),
        })}
        initialValues={{ email: '', password: '' }}
        onSubmit={({ email, password }, { resetForm }) => {
          login(email, password, from);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  className={`form-control ${
                    errors.email && touched.email ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="password">Heslo</label>
                <Field
                  name="password"
                  type="password"
                  className={`form-control ${
                    errors.password && touched.password ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div className="text-center">
              <Button type="submit" className="width-50-991-100 ">
                Prihlásiť
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p>
                Zabudli ste heslo?
                <Link to={'/forgot-password'} className="ms-2">
                  Obnovte si ho
                </Link>
              </p>
              <p>
                Ešte nemáte účet?
                <Link to={'/register'} className="ms-2">
                  Zaregistrujte sa
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {error !== '' && (
        <div className="centered h4 error-msg">
          <p>{error}</p>
        </div>
      )}
      {isLoading && error === '' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
};

export default LoginPage;
