import { useState, useEffect } from 'react';

const Question = ({ data, onNext, onQuit, onIncorrect, onCorrect, currentQuestionNumber, totalQuestions, isReviewQuiz }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pendingIncorrect, setPendingIncorrect] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkAnswer = (selectedAnswer) => {
    let correct = false;
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      correct = data.answer.includes(parseInt(selectedAnswer));
    } else if (data.questionType === 'FIB') {
      correct = selectedAnswer.trim().toLowerCase() === data.answer[0].toLowerCase();
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      onCorrect(data);  // Pass the entire question data
    } else {
      setPendingIncorrect(true);
    }
  };

  const getCorrectAnswerText = () => {
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      return data.answer.map(answerIndex => data.options[answerIndex]).join(', ');
    }
    return data.answer.join(', ');
  };

  const handleNext = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (pendingIncorrect) {
        await onIncorrect(data);
      }
      resetQuestion();
    } finally {
      // 少なくとも500ミリ秒は待機
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsProcessing(false);
    }
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

  const handleMarkAsReview = () => {
    setMarkedForReview(true);
    onIncorrect(data);
    resetQuestion();
  };

  const handleMarkAsCorrect = () => {
    setIsCorrect(true);
    setPendingIncorrect(false);
    onCorrect();
    resetQuestion();
  };

  const resetQuestion = () => {
    setSelectedOption('');
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setPendingIncorrect(false);
    setMarkedForReview(false);
    onNext();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (data.questionType === 'MCQ') {
        const key = event.key;
        const optionIndex = parseInt(key) - 1;
        if (!isNaN(optionIndex) && optionIndex >= 0 && optionIndex < Object.keys(data.options).length) {
          if (!isAnswered) {
            const optionKey = Object.keys(data.options)[optionIndex];
            setSelectedOption(optionKey);
            checkAnswer(optionKey);
          }
        }
      }

      if (event.key === 'Enter' && isAnswered) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [data, isAnswered]);

  if (!data) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <div className="mb-4 text-gray-500 font-bold">
          {isReviewQuiz ? `Review question ${currentQuestionNumber}` : `Question ${currentQuestionNumber}`} / {totalQuestions}
      </div>
      <h2 className="text-lg whitespace-pre-wrap">{data.questionText}</h2>
      {(data.questionType === 'MCQ' || data.questionType === 'SA') && data.options ? (
        <div className="mt-5">
          {Object.entries(data.options).map(([key, value], index) => (
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
      {isAnswered && (
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
          <p className="mt-2 whitespace-pre-wrap">{data.explanation}</p>
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
                className="px-4 py-2 bg-red-400 text-white rounded w-20"
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
