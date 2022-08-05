import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  onSubmit: (values: any) => void;
  onSubmitText?: string;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  return (
    <>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string()
            .trim()
            .required(translations?.isRequiredErr),
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
        onSubmit={(values) => {
          props.onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="currentPassword">
                  {translations?.currentPasswordLabel}
                </label>
                <Field
                  type="password"
                  name="currentPassword"
                  className={`form-control ${
                    errors.currentPassword && touched.currentPassword
                      ? 'is-invalid'
                      : ''
                  }`}
                />
                <ErrorMessage name="currentPassword">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="newPassword">
                  {translations?.newPasswordLabel}
                </label>
                <Field
                  type="password"
                  name="newPassword"
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
                  type="password"
                  name="confirmNewPassword"
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
              <Button type="submit" className="width-responsive">
                {translations?.changePasswordConfirmSubmitLabel}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
