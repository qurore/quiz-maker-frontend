import React from 'react';

const QuestionHeader = ({ 
  currentQuestionNumber, 
  totalQuestions, 
  isReviewQuiz, 
  markedForReview,
  correctCount,
  totalAnsweredCount 
}) => {
  return (
    <div className="mb-4 text-gray-500 font-bold flex justify-between items-center">
      <div>
        {isReviewQuiz ? `Review question ${currentQuestionNumber}` : `Question ${currentQuestionNumber}`} / {totalQuestions}
        {markedForReview && <span className="ml-2 text-yellow-600">(Marked for Review)</span>}
      </div>
      <div>
        Answered: {totalAnsweredCount} ({correctCount} correct)
      </div>
    </div>
  );
};

export default QuestionHeader;
