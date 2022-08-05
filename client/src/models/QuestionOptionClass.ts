class QuestionOptionClass {
  id: number;
  title: string;
  isCorrect: boolean;

  constructor(id: number, title: string, correct: boolean) {
    this.id = id;
    this.title = title;
    this.isCorrect = correct;
  }
}

export type QuestionOptionRequest = {
  title: string;
  isCorrect: boolean;
};

export const convertQuestionOptionClassToRequest = (
  option: QuestionOptionClass
): QuestionOptionRequest => {
  return {
    isCorrect: option.isCorrect,
    title: option.title,
  };
};

export default QuestionOptionClass;
