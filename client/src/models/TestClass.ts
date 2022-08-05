import TestQuestionClass, {
  convertTestQuestionClassToRequest,
  QuestionEvaluateRequest,
  TestQuestionRequest,
} from "./TestQuestionClass";

class TestClass {
  id: number;
  title: string;
  position: number;
  questions: TestQuestionClass[];

  constructor(
    id: number,
    title: string,
    position: number,
    questions: TestQuestionClass[]
  ) {
    this.id = id;
    this.title = title;
    this.position = position;
    this.questions = questions;
  }
}

export type TestRequest = {
  title: string;
  position: number;
  questions: TestQuestionRequest[];
};

export type TestEvaluateRequest = {
  started_at: Date;
  answers: QuestionEvaluateRequest[];
};

export const convertTestClassToRequest = (test: TestClass): TestRequest => {
  return {
    position: test.position,
    title: test.title,
    questions: test.questions.map((question) =>
      convertTestQuestionClassToRequest(question)
    ),
  };
};

export default TestClass;
