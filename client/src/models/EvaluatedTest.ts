import TestClass from "./TestClass";

export interface EvalutedTest {
  finished_at: string;
  id: number;
  userId: number;
  maxPoints: number;
  resultPoints: number;
  started_at: string;
  test: {
    title: string;
    id: number;
  };
}

interface Answer {
  finishedTestId: number;
  full_answer: string;
  id: number;
  isCorrect: boolean;
  points: number;
  questionId: number;
}

export interface EvalutedTestDetail {
  finished_at: string;
  id: number;
  maxPoints: number;
  resultPoints: number;
  started_at: string;
  test: TestClass;
  testUpdated: boolean;
  answers: Answer[];
}
