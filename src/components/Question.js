import { useState } from 'react';

function Question({ data, onNext, onIncorrect, onQuit, currentQuestionNumber, totalQuestions }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = (selectedAnswer) => {
    let correct = false;
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      correct = data.answer.includes(parseInt(selectedAnswer));
    } else if (data.questionType === 'FIB') {
      correct = selectedAnswer.trim().toLowerCase() === data.answer[0].toLowerCase();
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (!correct) {
      onIncorrect(data);
    }
  };

  const getCorrectAnswerText = () => {
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      return data.answer.map(answerIndex => data.options[answerIndex]).join(', ');
    }
    return data.answer.join(', ');
  };

  const handleNext = () => {
    setSelectedOption('');
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    onNext();
  };

  const handleSkip = () => {
    onNext();
  };

  const handleQuitClick = () => {
    setShowQuitModal(true);
  };

  const handleConfirmQuit = () => {
    setShowQuitModal(false);
    onQuit();
  };

  const handleCancelQuit = () => {
    setShowQuitModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowQuitModal(false);
    }
  };

  if (!data) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <div className="mb-4 text-gray-600">
        Question {currentQuestionNumber} / {totalQuestions}
      </div>
      <h2 className="text-lg">{data.questionText}</h2>
      {(data.questionType === 'MCQ' || data.questionType === 'SA') && data.options ? (
        <div className="mt-5">
          {Object.entries(data.options).map(([key, value]) => (
            <button
              key={key}
              className={`block w-full text-left p-2 border mb-2 ${
                selectedOption === key ? 'bg-blue-200' : ''
              }`}
              onClick={() => {
                if (!isAnswered) {
                  setSelectedOption(key);
                  checkAnswer(key);
                }
              }}
              disabled={isAnswered}
            >
              {value}
            </button>
          ))}
        </div>
      ) : data.questionType === 'FIB' ? (
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
      ) : (
        <div>Unsupported question type</div>
      )}
      <div className="mt-6 flex justify-between items-center">
        <button
          className="p-2 bg-gray-300 text-gray-800 rounded w-20"
          onClick={handleQuitClick}
        >
          Quit
        </button>
        {!isAnswered ? (
          <button
            className="p-2 bg-blue-500 text-white rounded w-20"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <button
            className="p-2 bg-blue-500 text-white rounded w-20"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
      {isAnswered && (
        <div className="mt-4">
          {isCorrect ? (
            <div className="text-green-500">Correct! 🎉</div>
          ) : (
            <div className="text-red-500">
              Incorrect. The correct answer is: <strong>{getCorrectAnswerText()}</strong>
            </div>
          )}
          <p className="mt-2">{data.explanation}</p>
        </div>
      )}
      {showQuitModal && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-5 rounded-lg shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4">Confirm Quit</h2>
            <p className="mb-6">Do you really want to quit?</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded w-20"
                onClick={handleCancelQuit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded w-20"
                onClick={handleConfirmQuit}
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Question;
