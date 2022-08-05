import { Field, ErrorMessage } from "formik";
import { CloseButton } from "react-bootstrap";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  onChange: (e: any) => void;
  error?: boolean;
  as?: string;
  withCloseButton?: {onDelete: () => void};
};

const CustomField: React.FC<Props> = (props) => {
  return (
    <div>
      <h5 className="card-title">
        {props.label}
        {props.withCloseButton && (
          <CloseButton
            className="float-end"
            onClick={props.withCloseButton.onDelete}
          />
        )}
      </h5>
      <Field
        name={props.name}
        as={props.as ? props.as : ""}
        type={`${props.type ? props.type : "text"}`}
        step={props.type === 'number' ? 0.5 : ''}
        placeholder={props.placeholder}
        className={`form-control ${props.error ? "is-invalid" : ""} ${
          props.className
        }`}
        onChange={(e: any) => {props.onChange(e)}}
      >
        {props.children}
      </Field>
      <ErrorMessage name={props.name}>
        {(msg) => <div className="error-msg mt-2">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default CustomField;
