import React from 'react';

const QuestionFeedback = ({ isCorrect, getCorrectAnswerText, explanation }) => {
  return (
    <div className="mt-4">
      {isCorrect ? (
        <div className="text-green-500">Correct! 🎉</div>
      ) : (
        <div>
          <div className="text-red-500">
            Incorrect. The correct answer is: <strong>{getCorrectAnswerText()}</strong>
          </div>
        </div>
      )}
      <p className="mt-2 whitespace-pre-wrap">{explanation}</p>
    </div>
  );
};

export default QuestionFeedback;
