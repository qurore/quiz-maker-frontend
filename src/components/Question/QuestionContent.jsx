import React from 'react';

const QuestionContent = ({ 
  data, 
  isAnswered, 
  selectedOption, 
  userAnswer,
  setSelectedOption,
  setUserAnswer,
  checkAnswer,
  isCorrect
}) => {
  if (!data) return null;

  if (data.questionType === 'MCQ' || data.questionType === 'SA') {
    return (
      <div className="mt-5">
        {Object.entries(data.options).map(([key, value]) => (
          <button
            key={key}
            className={`block w-full text-left p-2 border border-gray-200 mb-2 transition-colors duration-300 ease-in-out ${
              !isAnswered ? 'hover:bg-blue-100' : ''
            } ${
              selectedOption === key
                ? isAnswered
                  ? isCorrect
                    ? 'bg-green-200'
                    : 'bg-red-200'
                  : 'bg-green-200'
                : ''
            }`}
            onClick={() => {
              if (!isAnswered) {
                setSelectedOption(key);
                checkAnswer(key);
              }
            }}
            disabled={isAnswered}
          >
            <span className="font-bold mr-2"></span> {value}
          </button>
        ))}
      </div>
    );
  }

  if (data.questionType === 'FIB') {
    return (
      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onBlur={() => {
            if (!isAnswered) {
              checkAnswer(userAnswer);
            }
          }}
          disabled={isAnswered}
        />
      </div>
    );
  }

  return <div>Unsupported question type</div>;
};

export default QuestionContent;
