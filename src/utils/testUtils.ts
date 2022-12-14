const { QuestionType } = require('@prisma/client');

const calculateTestMaxPoints = (test: any) => {
  let sum = 0;
  test.questions.forEach((question: any) => {
    sum += +question.points;
  });
  return sum;
};

const processUserTestAnswers = (test: any, answers: any[]) => {
  const prismaAnswers: any = [];
  let sum = 0;

  test.questions.forEach((question: any) => {
    const answerIndex = answers.findIndex(
      (answer) => answer.questionId === question.id
    );
    if (answerIndex !== -1) {
      const userAnswers = answers[answerIndex].answer;
      let pointAmount = 0;
      userAnswers.forEach((userAnsw: string) => {
        const optionIndex = question.options.findIndex(
          (opt: any) => opt.title === userAnsw
        );
        if (optionIndex === -1) {
          if (question.type === QuestionType.INPUT) {
            prismaAnswers.push({
              full_answer: userAnsw,
              isCorrect: false,
              points: 0,
              questionId: question.id,
            });
          }
        } else {
          const pointsToAssign = pointAmount;
          if (question.type === QuestionType.MULTIPLE_CHOICES) {
            const correctAnswers = question.options.filter(
              (opt: any) => opt.isCorrect
            );
            if (correctAnswers.length === 0) {
              pointAmount += 0;
            } else {
              pointAmount = question.options[optionIndex].isCorrect
                ? +question.points / correctAnswers.length
                : -(
                    +question.points /
                    (question.options.length - correctAnswers.length)
                  );
            }
          } else {
            pointAmount = question.options[optionIndex].isCorrect
              ? +question.points
              : 0;
          }

          prismaAnswers.push({
            full_answer: userAnsw,
            isCorrect: question.options[optionIndex].isCorrect,
            points: pointAmount,
            questionId: question.id,
          });
          pointAmount += pointsToAssign;
        }
      });
      sum += Math.max(0, pointAmount);
    }
  });
  return { totalPoints: sum, answers: prismaAnswers };
};

module.exports = {
  calculateTestMaxPoints,
  processUserTestAnswers,
};
