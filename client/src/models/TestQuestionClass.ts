import QuestionOptionClass, {
  convertQuestionOptionClassToRequest,
  QuestionOptionRequest,
} from "./QuestionOptionClass";

export enum TestQuestionType {
  INPUT = "INPUT",
  MULTIPLE_CHOICES = "MULTIPLE_CHOICES",
  SINGLE_CHOICE = "SINGLE_CHOICE",
}

class TestQuestionClass {
  id: number;
  position: number;
  points: number;
  type: TestQuestionType;
  title: string;
  options: QuestionOptionClass[];

  constructor(
    id: number,
    position: number,
    points: number,
    title: string,
    type: TestQuestionType,
    options: QuestionOptionClass[]
  ) {
    this.id = id;
    this.title = title;
    this.points = points;
    this.position = position;
    this.type = type;
    this.options = options;
  }
}

export type TestQuestionRequest = {
  position: number;
  points: number;
  type: TestQuestionType;
  title: string;
  options: QuestionOptionRequest[];
};

export type QuestionEvaluateRequest = {
  questionId: number;
  type: TestQuestionType;
  answer: string[];
};

export const convertTestQuestionClassToRequest = (
  question: TestQuestionClass
): TestQuestionRequest => {
  return {
    points: question.points,
    title: question.title,
    type: question.type,
    position: question.position,
    options: question.options.map((option) =>
      convertQuestionOptionClassToRequest(option)
    ),
  };
};

export default TestQuestionClass;
