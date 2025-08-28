
export const isAnswerCorrect = (userAnswer: any, correctAnswer: any): boolean => {
  if (correctAnswer === undefined) {
    return false;
  }
  
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return false;
  }

  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) {
      return false;
    }
    // Create copies with slice() before sorting to avoid mutating the original arrays
    const sortedUserAnswer = userAnswer.slice().sort();
    const sortedCorrectAnswer = correctAnswer.slice().sort();
    return JSON.stringify(sortedUserAnswer) === JSON.stringify(sortedCorrectAnswer);
  }

  // Use double equals for type coercion (e.g., '5' == 5) which is common in form inputs
  return String(userAnswer).trim() == String(correctAnswer).trim();
};
