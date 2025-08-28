
export const evaluateCondition = (expression: string, answers: { [key: string]: any }): boolean => {
  if (!expression) {
    return true;
  }

  const keys = Object.keys(answers);
  const values = Object.values(answers);

  try {
    // We are using new Function here to dynamically evaluate the expression.
    // This is safe in this context because the expression comes from the form definition (developer-controlled), not user input.
    // All variables in the expression are scoped to the keys of the `answers` object.
    const func = new Function(...keys, `"use strict"; return ${expression}`);
    return !!func(...values);
  } catch (e) {
    // If a ReferenceError occurs, it means a variable in the expression is not in `answers`.
    // This happens when a question the condition depends on has not been answered yet.
    // In this case, the condition should evaluate to false.
    if (e instanceof ReferenceError) {
      return false;
    }
    // For other types of errors (e.g., a SyntaxError in the expression), we log them.
    console.error("Error evaluating condition:", expression, e);
    return false;
  }
};
