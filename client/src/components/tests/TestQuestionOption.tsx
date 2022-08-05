import { Field } from "formik";
import { Form } from "react-bootstrap";
import QuestionOptionClass from "../../models/QuestionOptionClass";

type Props = {
  questionType: "checkbox" | "radio";
  option: QuestionOptionClass;
  name: string;
  index: string;
};

const TestQuestionOption: React.FC<Props> = (props) => {
  return (
    <Form.Check>
      <span className="ms-1 ms-sm-3">{props.index}</span>
      <Field
        type={props.questionType}
        id={`${props.name}${props.option.id}`}
        value={props.option.title}
        name={props.name}
        className={"ms-1 ms-sm-2 ms-md-3 form-check-input"}
      />
      <Form.Label
        className={"d-inline-block ms-2 ms-md-3 form-check-label"}
        htmlFor={`${props.name}${props.option.id}`}
      >
        {props.option.title}
      </Form.Label>
    </Form.Check>
  );
};

export default TestQuestionOption;
