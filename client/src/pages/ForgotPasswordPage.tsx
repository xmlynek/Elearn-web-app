import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useLangTranslation from '../hooks/useLangTranslation';

const ForgotPasswordPage: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const translations = useLangTranslation();

  const {
    isLoggedIn,
    forgotPassword,
    isLoading,
    error,
    resetStateVariables,
    success,
  } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    resetStateVariables();
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate, resetStateVariables]);

  return (
    <section className="logreg-container text-start">
      <h3 className="text-center">{translations?.forgotPasswordLabel}</h3>
      <Formik
        validationSchema={Yup.object({
          email: Yup.string()
            .email(translations?.wrongEmailFormatErr)
            .trim()
            .required(translations?.isRequiredErr),
        })}
        initialValues={{ email: '' }}
        onSubmit={({ email }, { resetForm }) => {
          forgotPassword(email);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="email">{translations?.yourEmailLabel}</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${
                    errors.email && touched.email ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div className="text-center">
              <Button type="submit" className="width-50-991-100 ">
                {translations?.sendEmailLabel}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p>
                <Link to={'/login'} className="ms-2">
                  {translations?.backToLoginPageLabel}
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && error !== '' && (
        <div className="centered h4 error-msg">
          <p>{error}</p>
        </div>
      )}
      {!isLoading && error === '' && success && (
        <div className="centered h4">
          <p>{translations?.emailWasSentWithInstructionsMessage}</p>
        </div>
      )}
    </section>
  );
};

export default ForgotPasswordPage;
