import { Field, FormikValues } from "formik";
import { Form } from "react-bootstrap";
import TestQuestionClass, {
  TestQuestionType,
} from "../../models/TestQuestionClass";
import TestQuestionOption from "./TestQuestionOption";

type Props = {
  question: TestQuestionClass;
  index: number;
  values?: FormikValues;
  onChange?: Function;
};

const TestQuestion: React.FC<Props> = (props) => {
  let output = null;

  let optionType: "checkbox" | "radio" = "radio";
  if (props.question.type === TestQuestionType.INPUT) {
    output = (
      <Field
        className="mt-2 form-control"
        type="text"
        onChange={props.onChange}
        value={props.values && props.values[`${props.question.id}.text`]}
        name={`${props.question.id}`}
        id={`${props.question.title}${props.question.id}`}
        placeholder={"Vaša odpoveď"}
      />
    );
  } else if (props.question.type === TestQuestionType.MULTIPLE_CHOICES) {
    optionType = "checkbox";
  } else if (props.question.type === TestQuestionType.SINGLE_CHOICE) {
    optionType = "radio";
  }

  output =
    output === null
      ? props.question.options.map((option, index) => (
          <TestQuestionOption
            name={`${props.question.id}`}
            option={option}
            questionType={optionType}
            key={option.id}
            index={String.fromCharCode("A".charCodeAt(0) + index)}
          />
        ))
      : output;

  return (
    <Form.Group className="mt-4 mb-3">
      <h2 className="h4">
        {props.index}. {props.question.title} ({props.question.points}b)
      </h2>
      <div>{output}</div>
    </Form.Group>
  );
};

export default TestQuestion;
