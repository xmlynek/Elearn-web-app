import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useLangTranslation from '../hooks/useLangTranslation';

const ResetPasswordPage: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const {
    isLoggedIn,
    resetPassword,
    resetStateVariables,
    isLoading,
    error,
    success,
  } = authContext;

  const navigate = useNavigate();
  const translations = useLangTranslation();
  const params = useParams();
  const token = params.token ? params.token : '';

  useEffect(() => {
    resetStateVariables();
    if (isLoggedIn || !token) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate, resetStateVariables, token]);

  return (
    <section className="logreg-container text-start">
      <h3 className="text-center">{translations?.restorePasswordHeader}</h3>
      <Formik
        validationSchema={Yup.object({
          newPassword: Yup.string()
            .trim()
            .required(translations?.isRequiredErr)
            .min(8, translations?.passwordLengthErr)
            .max(255, translations?.maxCharLengthErr)
            .matches(/\d/, translations?.passwordMustContainNumberErr)
            .matches(/[a-zA-Z]/, translations?.passwordMustContainLetterErr),
          confirmNewPassword: Yup.string()
            .trim()
            .required(translations?.isRequiredErr)
            .oneOf(
              [Yup.ref('newPassword')],
              translations?.passwordMustMatchErr
            ),
        })}
        initialValues={{ newPassword: '', confirmNewPassword: '' }}
        onSubmit={(values, { resetForm }) => {
          resetPassword(values, token);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="newPassword">
                  {translations?.newPasswordLabel}
                </label>
                <Field
                  name="newPassword"
                  type="password"
                  className={`form-control ${
                    errors.newPassword && touched.newPassword
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <ErrorMessage name="newPassword">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="confirmNewPassword">
                  {translations?.confirmNewPasswordLabel}
                </label>
                <Field
                  name="confirmNewPassword"
                  type="password"
                  className={`form-control ${
                    errors.confirmNewPassword && touched.confirmNewPassword
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <ErrorMessage name="confirmNewPassword">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div className="text-center">
              <Button type="submit" className="width-50-991-100 ">
                {translations?.restorePasswordSubmitButtonTitle}
              </Button>
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
          <p>
            {error}
            <br />
            <Link to={'/forgot-password'} className="ms-2 mt-2">
              {translations?.restorePasswordAgainDueErrorHeader}
            </Link>
          </p>
        </div>
      )}
      {!isLoading && error === '' && success && (
        <div className="centered h4">
          <p>
            {translations?.passwordSuccessfullyRestoredMesage}
            <Link to={'/login'} className="ms-2">
              {translations?.logInLabel}
            </Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default ResetPasswordPage;
