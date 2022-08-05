import { Formik, Form, FormikValues } from "formik";
import { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestQuestion from "../components/tests/TestQuestion";
import ContainerWrapper from "../components/Layout/ContainerWrapper";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import {
  QuestionEvaluateRequest,
  TestQuestionType,
} from "../models/TestQuestionClass";
import TestContext from "../store/test-context";
import ConfirmDialogButton from "../components/UI/ConfirmDialogButton";

const TestPage: React.FC = () => {
  const params = useParams();

  const testId = params.testId;
  const startTime = new Date();

  const testCtx = useContext(TestContext);
  const { fetchById, data, evaluateTest } = testCtx;
  const { opStatus: status, tests, error } = data;
  const test = tests[0];

  useEffect(() => {
    if (testId && parseInt(testId) > 0) {
      fetchById(parseInt(testId));
    }
  }, [fetchById, testId]);

  if (status === "Pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    error ||
    status === "Failure" ||
    (status === "Finished" && (!tests || tests.length === 0))
  ) {
    return (
      <p className="centerVertical h1 bg-info py-2 px-3">
        {error === "Request failed with status code 404"
          ? `Test s ID ${testId} nebol nájdený`
          : error}
      </p>
    );
  }

  let options: any = {};

  test.questions.forEach((question) => {
    if (question.type === TestQuestionType.INPUT) {
      options[`${question.id}`] = "";
    } else if (question.type === TestQuestionType.SINGLE_CHOICE) {
      options[`${question.id}`] = "";
    } else if (question.type === TestQuestionType.MULTIPLE_CHOICES) {
      options[`${question.id}`] = "";
    }
  });

  const submitHandler = async (values: FormikValues) => {
    evaluateTest(
      {
        started_at: startTime,
        answers: test.questions.map((question): QuestionEvaluateRequest => {
          let usersAnswer = values[question.id];
          return {
            questionId: question.id,
            type: question.type,
            answer:
              question.type === TestQuestionType.MULTIPLE_CHOICES
                ? (usersAnswer ? usersAnswer : [""])
                : usersAnswer ? [usersAnswer] : [""],
          };
        }),
      },
      test.id
    );
  };

  return (
    <ContainerWrapper>
      <Row>
        <Col>
          <header className="text-center">
            <h1 className="display-2 txt-main">Test: {test.title}</h1>
          </header>
        </Col>
      </Row>

      <Row className="px-1 px-md-3 px-lg-4 px-xl-5">
        <Formik
          initialValues={{ testId: test.id, options }}
          onSubmit={(values) => {
            // console.log(values);
            submitHandler(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form>
              {test.questions.map((question, index) => (
                <TestQuestion
                  key={question.id}
                  question={question}
                  index={index + 1}
                  values={values}
                  onChange={handleChange}
                />
              ))}
              <div className="centered">
                <ConfirmDialogButton
                  confirmBtnTitle="Odoslať"
                  headerTitle="Naozaj chcete odoslať a vyhodnotiť tento test?"
                  title="Odoslanie testu"
                  onConfirm={handleSubmit}
                  confirmBtnVariant="primary"
                  className="width-50-991-100"
                >
                  Odoslat
                </ConfirmDialogButton>
              </div>
            </Form>
          )}
        </Formik>
      </Row>
    </ContainerWrapper>
  );
};

export default TestPage;
