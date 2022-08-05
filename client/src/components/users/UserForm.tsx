import { ErrorMessage, Field, Form, Formik } from 'formik';
import User, { UserRole } from '../../models/User';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  formData?: User;
  onSubmit: Function;
  onSubmitText?: string | React.ReactNode;
  registration?: boolean;
  ignorePassword?: boolean;
  allowRoleChange?: boolean;
};

const UserForm: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  const initialValues = props.formData
    ? {
        firstname: props.formData.firstname,
        lastname: props.formData.lastname,
        email: props.formData.email,
        password: '',
        role: props.formData.role,
      }
    : {
        email: '',
        firstname: '',
        lastname: '',
        role: UserRole.STUDENT,
        password: '',
        confirmPassword: '',
        confirmProcessData: props.registration ? false : true,
      };

  let validationSchema;

  if (props.registration) {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required(translations?.isRequiredErr),
      lastname: Yup.string().trim().required(translations?.isRequiredErr),
      email: Yup.string()
        .email(translations?.wrongEmailFormatErr)
        .trim()
        .required(translations?.isRequiredErr),
      password: Yup.string()
        .trim()
        .required(translations?.isRequiredErr)
        .min(8, translations?.passwordLengthErr)
        .max(255, translations?.maxCharLengthErr)
        .matches(/\d/, translations?.passwordMustContainNumberErr)
        .matches(/[a-zA-Z]/, translations?.passwordMustContainLetterErr),
      confirmPassword: Yup.string()
        .trim()
        .required(translations?.isRequiredErr)
        .oneOf([Yup.ref('password')], translations?.passwordMustMatchErr),
      confirmProcessData: Yup.boolean()
        .required(translations?.isRequiredErr)
        .oneOf([true], translations?.isRequiredErr),
    });
  } else {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required(translations?.isRequiredErr),
      lastname: Yup.string().trim().required(translations?.isRequiredErr),
      email: Yup.string()
        .email(translations?.wrongEmailFormatErr)
        .trim()
        .required(translations?.isRequiredErr),
      password: Yup.string()
        .trim()
        .required(translations?.isRequiredErr)
        .min(8, translations?.passwordLengthErr)
        .max(255, translations?.maxCharLengthErr)
        .matches(/\d/, translations?.passwordMustContainNumberErr)
        .matches(/[a-zA-Z]/, translations?.passwordMustContainLetterErr),
    });
  }
  if (props.allowRoleChange && props.ignorePassword) {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required(translations?.isRequiredErr),
      lastname: Yup.string().trim().required(translations?.isRequiredErr),
      email: Yup.string()
        .email(translations?.wrongEmailFormatErr)
        .trim()
        .required(translations?.isRequiredErr),
      role: Yup.string().trim().required(translations?.isRequiredErr),
    });
  }

  return (
    <>
      <Formik
        onSubmit={(values) => {
          props.onSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="firstname">
                  {translations?.firstNameLabel}
                </label>
                <Field
                  id="firstname"
                  name="firstname"
                  className={`form-control ${
                    errors.firstname && touched.firstname ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="firstname">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="lastname">{translations?.lastNameLabel}</label>
                <Field
                  id="lastname"
                  name="lastname"
                  className={`form-control ${
                    errors.lastname && touched.lastname ? 'is-invalid' : ''
                  }`}
                />
                <ErrorMessage name="lastname">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
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

            {!props.ignorePassword && (
              <div className="mt-3 mb-4">
                <div className="form-control">
                  <label htmlFor="password">
                    {translations?.passwordLabel}
                  </label>
                  <Field
                    id="password"
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
            )}

            {props.registration && (
              <>
                <div className="mt-3 mb-4">
                  <div className="form-control">
                    <label htmlFor="confirmPassword">
                      {translations?.confirmPasswordLabel}
                    </label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        errors.password && touched.password ? 'is-invalid' : ''
                      }`}
                    />
                    <ErrorMessage name="confirmPassword">
                      {(msg) => <div className="error-msg">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="mt-3 mb-4">
                  <div className="form-control">
                    <div className="form-check">
                      <Field
                        id="confirmProcessData"
                        name="confirmProcessData"
                        type="checkbox"
                        className={`form-check-input`}
                      />
                      <label
                        htmlFor="confirmProcessData"
                        className="form-check-label"
                      >
                        {translations?.consentToDataProcessingLabel}
                      </label>
                      <ErrorMessage name="confirmProcessData">
                        {(msg) => <div className="error-msg">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </>
            )}

            {props.allowRoleChange && (
              <div className="mt-3 mb-4">
                <div className="form-control">
                  <label htmlFor="confirmPassword">
                    {translations?.userRoleLabel}
                  </label>
                  <Field
                    name="role"
                    as="select"
                    className={`form-control ${
                      errors.role && touched.role ? 'is-invalid' : ''
                    }`}
                  >
                    <option value={UserRole.STUDENT}>{UserRole.STUDENT}</option>
                    <option value={UserRole.TEACHER}>{UserRole.TEACHER}</option>
                    <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
                  </Field>
                  <ErrorMessage name="role">
                    {(msg) => <div className="error-msg">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button type="submit" className="width-responsive">
                {props.onSubmitText}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
