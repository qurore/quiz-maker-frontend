import React from 'react';

const QuestionActions = ({
  isAnswered,
  isCorrect,
  isProcessing,
  handleQuitClick,
  handleMarkAsReview,
  handleMarkAsCorrect,
  handleSkip,
  handleNext
}) => {
  return (
    <div className="mt-6 flex justify-between items-center">
      <button
        className="p-2 bg-gray-300 text-gray-800 rounded w-20"
        onClick={handleQuitClick}
      >
        Quit
      </button>
      <div>
        {!isAnswered && (
          <button
            className="p-2 bg-blue-500 text-white rounded w-40 mr-5"
            onClick={handleMarkAsReview}
          >
            Mark for Review
          </button>
        )}
        {isAnswered && !isCorrect && (
          <button
            className="p-2 bg-blue-200 text-black rounded w-40 mr-5"
            onClick={handleMarkAsCorrect}
          >
            Mark as Correct
          </button>
        )}
        {isAnswered && isCorrect && (
          <button
            className="p-2 bg-blue-500 text-white rounded w-40 mr-5"
            onClick={handleMarkAsReview}
          >
            Mark for Review
          </button>
        )}
        {!isAnswered ? (
          <button
            className="p-2 bg-blue-500 text-white rounded w-20"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <button
            className={`p-2 bg-blue-500 text-white rounded w-20 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNext}
            disabled={isProcessing}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionActions;
