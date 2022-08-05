import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ContainerWrapper from "../components/Layout/ContainerWrapper";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import { EvalutedTestDetail } from "../models/EvaluatedTest";
import TestQuestionClass, {
  TestQuestionType,
} from "../models/TestQuestionClass";

const EvalutedTestPage: React.FC = (props) => {
  const [evalTest, setEvalTest] = useState<EvalutedTestDetail>();
  const params = useParams();
  const axiosPrivate = usePrivateAxios(
    `/users/${params?.userId}/tests/${params?.evalTestId}`
  );

  const [state, setState] = useState<{
    status?: "err" | "success";
    isLoading: boolean;
    msg?: string;
  }>({
    isLoading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      setState({ isLoading: true });
      try {
        let { data } = await axiosPrivate.get("");
        setEvalTest(data);
        setState({ status: "success", isLoading: false });
      } catch (err: any) {
        setState({
          status: "err",
          isLoading: false,
          msg: err.response.data.message
            ? err.response.data.message
            : err.message,
        });
      }
    };
    loadData();
  }, []);

  const checkAnswer = (questionId: number, option: string) => {
    const answer = evalTest?.answers.filter(
      (answer) =>
        answer.questionId === questionId && answer.full_answer === option
    );
    return answer && answer.length > 0;
  };

  const getInputAnswer = (questionId: number) => {
    const answer = evalTest?.answers.filter(
      (answ) => answ.questionId === questionId
    );
    return answer && answer.length > 0 ? answer[0].full_answer : "";
  };

  const getQuestionPoints = (questionId: number) => {
    const answers = evalTest?.answers.filter(
      (answer) => answer.questionId === questionId
    );
    if (answers && answers.length > 0) {
      let sum = 0;
      answers.forEach((answer) => (sum += +answer.points));
      return sum;
    }
    return 0;
  };

  const checkInputAnswer = (
    question: TestQuestionClass,
    answer: string
  ): { isCorrect: boolean; correctAnswers: string[] } => {
    return {
      isCorrect: question.options.some(
        (opt) => opt.title === getInputAnswer(question.id)
      ),
      correctAnswers: question.options.map((opt) => opt.title),
    };
  };

  if (state.isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (state.status === "err" && !state.isLoading) {
    return (
      <p className="centerVertical h1 bg-info py-2 px-3 text-center">
        {state.msg === "Evaluated test with id 15 not found"
          ? `Vysledok testu s ID ${params.evalTestId} nebol nájdený`
          : state.msg === "You dont have permission to perform this action!"
          ? "Nemáte dosatočné oprávnenie aby ste mohli prezerať testy iných používateľov!"
          : state.msg}
      </p>
    );
  }

  if (!evalTest) {
    return (
      <p className="centerVertical h1 bg-info py-2 px-3">
        {`Vysledok testu s ID ${params.evalTestId} nebol nájdený`}
      </p>
    );
  }

  return (
    <ContainerWrapper>
      <Row>
        <Col>
          <header className="text-center">
            <h1 className="display-2 txt-main mb-3 mb-lg-4">
              Výsledok testu
              <br /> {evalTest.test.title}
            </h1>
          </header>
        </Col>
      </Row>
      <Row className="px-1 px-md-3 px-lg-4 px-xl-5">
        {evalTest.testUpdated && (
          <div className="centered error-msg">
            <p className="h1">
              Test bol upravený. Náhľad obsahuje len základné informácie.
            </p>
          </div>
        )}
        <div className="centered">
          <h2 className="line-height-md">
            Počet získaných bodov: {evalTest?.resultPoints}/
            {evalTest?.maxPoints} (
            {((evalTest?.resultPoints / evalTest?.maxPoints) * 100).toFixed(2)}
            %)
            <br />
            Dátum a čas otvorenia:{" "}
            {new Date(evalTest.started_at).toLocaleString()}
            <br />
            Dátum a čas odovzdania:{" "}
            {new Date(evalTest.finished_at).toLocaleString()}
          </h2>
        </div>
        {evalTest.testUpdated && (
          <section className="text-center">
            <h2>Vyplnené odpovede</h2>
            <p className="h2 error-msg">
              Bodovanie nemusí odpovedať konečnému výsledku testu!
            </p>
            <table className="mt-4 table">
              <thead>
                <tr>
                  <th>Odpoveď</th>
                  <th>Správna</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {evalTest.answers.map((answer) => {
                  return (
                    <tr key={answer.id}>
                      <td>{answer.full_answer}</td>
                      <td>{answer.isCorrect ? "Áno" : "Nie"}</td>
                      <td>{answer.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
        {!evalTest.testUpdated &&
          evalTest.test.questions.map((question, index) => (
            <div key={question.id}>
              <h2 className="h4">
                {index + 1}. {question.title} (
                {Math.max(+getQuestionPoints(question.id).toFixed(2), 0)}/
                {question.points}b)
              </h2>
              <Form.Group className="mt-4 mb-3">
                {question.type === TestQuestionType.INPUT ? (
                  <div key={question.id + index + ".text"}>
                    <Form.Control
                      value={getInputAnswer(question.id)}
                      readOnly
                      className={`${
                        checkInputAnswer(question, getInputAnswer(question.id))
                          .isCorrect
                          ? "is-valid"
                          : "is-invalid"
                      }`}
                    />
                    {!checkInputAnswer(question, getInputAnswer(question.id))
                      .isCorrect && (
                      <p>
                        Správna odpoveď:{" "}
                        {checkInputAnswer(
                          question,
                          getInputAnswer(question.id)
                        ).correctAnswers.map((answ, index) => (
                          <span key={`${question.id}${answ}${index}`}>
                            {answ},{" "}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                ) : (
                  question.options.map((option, index) => (
                    <div key={option.id}>
                      <span className="ms-2 ms-sm-3">
                        {String.fromCharCode("A".charCodeAt(0) + index)}
                      </span>
                      <Form.Check
                        readOnly
                        type={
                          question.type === TestQuestionType.MULTIPLE_CHOICES
                            ? "checkbox"
                            : "radio"
                        }
                        checked={checkAnswer(question.id, option.title)}
                        name={"" + question.id}
                        className={"d-inline-block ms-1 ms-sm-3"}
                      />
                      <Form.Label
                        className={`ms-2 ms-sm-3 ${
                          option.isCorrect
                            ? "text-success"
                            : !option.isCorrect &&
                              checkAnswer(question.id, option.title)
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        {option.title}
                      </Form.Label>
                    </div>
                  ))
                )}
              </Form.Group>
            </div>
          ))}
      </Row>
    </ContainerWrapper>
  );
};

export default EvalutedTestPage;
