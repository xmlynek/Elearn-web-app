import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

type Props = {
    onSubmit: (values: any) => void;
    onSubmitText?: string;
  };

const ChangePasswordForm: React.FC<Props> = (props) => {
  return (
    <>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={Yup.object({
          currentPassword: Yup.string().trim().required("*Povinné"),
          newPassword: Yup.string()
            .trim()
            .required("*Povinné")
            .min(8, "Heslo musí mať aspoň 8 znakov")
            .max(255, "Maximálny počet znakov je 255")
            .matches(/\d/, "Heslo musí obsahovať aspoň jednu číslicu")
            .matches(/[a-zA-Z]/, "Heslo musí obsahovať aspoň jedno písmeno"),
          confirmNewPassword: Yup.string()
            .trim()
            .required("*Povinné")
            .oneOf([Yup.ref("newPassword")], "Heslá sa musia zhodovať"),
        })}
        onSubmit={(values) => {
            props.onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className={`form-floating mb-3`}>
            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="currentPassword">Súčasné heslo</label>
                <Field
                  type="password"
                  name="currentPassword"
                  className={`form-control ${
                    errors.currentPassword && touched.currentPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage name="currentPassword">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="mt-3 mb-4">
              <div className="form-control">
                <label htmlFor="newPassword">Nové heslo</label>
                <Field
                  type="password"
                  name="newPassword"
                  className={`form-control ${
                    errors.newPassword && touched.newPassword
                      ? "is-invalid"
                      : ""
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
                  Potvrdenie nového hesla
                </label>
                <Field
                  type="password"
                  name="confirmNewPassword"
                  className={`form-control ${
                    errors.confirmNewPassword && touched.confirmNewPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage name="confirmNewPassword">
                  {(msg) => <div className="error-msg">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" className="width-responsive">
                Potvrdiť zmenu
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
