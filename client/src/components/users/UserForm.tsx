import { ErrorMessage, Field, Form, Formik } from 'formik';
import User, { UserRole } from '../../models/User';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

type Props = {
  formData?: User;
  onSubmit: Function;
  onSubmitText?: string;
  registration?: boolean;
  ignorePassword?: boolean;
  allowRoleChange?: boolean;
};

const UserForm: React.FC<Props> = (props) => {
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
        role: UserRole.USER,
        password: '',
        confirmPassword: '',
        confirmProcessData: props.registration ? false : true,
      };

  let validationSchema;

  if (props.registration) {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required('*Povinné'),
      lastname: Yup.string().trim().required('*Povinné'),
      email: Yup.string()
        .email('Nesprávny formát emailu')
        .trim()
        .required('*Povinné'),
      password: Yup.string()
        .trim()
        .required('*Povinné')
        .min(8, 'Heslo musí mať aspoň 8 znakov')
        .max(255, 'Maximálny počet znakov je 255')
        .matches(/\d/, 'Heslo musí obsahovať aspoň jednu číslicu')
        .matches(/[a-zA-Z]/, 'Heslo musí obsahovať aspoň jedno písmeno'),
      confirmPassword: Yup.string()
        .trim()
        .required('*Povinné')
        .oneOf([Yup.ref('password')], 'Heslá sa musia zhodovať'),
      confirmProcessData: Yup.boolean()
        .required('*Povinné')
        .oneOf([true], '*Povinné'),
    });
  } else {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required('*Povinné'),
      lastname: Yup.string().trim().required('*Povinné'),
      email: Yup.string()
        .email('Nesprávny formát emailu')
        .trim()
        .required('*Povinné'),
      password: Yup.string()
        .trim()
        .required('*Povinné')
        .min(8, 'Heslo musí mať aspoň 8 znakov')
        .max(255, 'Maximálny počet znakov je 255')
        .matches(/\d/, 'Heslo musí obsahovať aspoň jednu číslicu')
        .matches(/[a-zA-Z]/, 'Heslo musí obsahovať aspoň jedno písmeno'),
    });
  }
  if (props.allowRoleChange && props.ignorePassword) {
    validationSchema = Yup.object({
      firstname: Yup.string().trim().required('*Povinné'),
      lastname: Yup.string().trim().required('*Povinné'),
      email: Yup.string()
        .email('Nesprávny formát emailu')
        .trim()
        .required('*Povinné'),
      role: Yup.string().trim().required('*Povinné'),
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
                <label htmlFor="firstname">Meno</label>
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
                <label htmlFor="lastname">Priezvisko</label>
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
                  <label htmlFor="password">Heslo</label>
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
                    <label htmlFor="confirmPassword">Potvrdenie hesla</label>
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
                        Súhlasím so spracovaním uvedených údajov
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
                  <label htmlFor="confirmPassword">Rola Používateľa</label>
                  <Field
                    name="role"
                    as="select"
                    className={`form-control ${
                      errors.role && touched.role ? 'is-invalid' : ''
                    }`}
                  >
                    <option value={UserRole.USER}>{UserRole.USER}</option>
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
