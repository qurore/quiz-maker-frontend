import { useState } from 'react';

function Question({ data, onNext, onIncorrect, onQuit, currentQuestionNumber, totalQuestions }) {
  const [selectedOption, setSelectedOption] = useState('');
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

  if (!data) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <div className="mb-2 text-gray-600">
        Question {currentQuestionNumber} / {totalQuestions}
      </div>
      <h2 className="text-lg font-semibold">{data.questionText}</h2>
      {(data.questionType === 'MCQ' || data.questionType === 'SA') && data.options ? (
        <div className="mt-4">
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
      <div className="mt-4 flex justify-between items-center">
        <button
          className="p-2 bg-gray-400 text-white rounded"
          onClick={onQuit}
        >
          Quit
        </button>
        {!isAnswered ? (
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <button
            className="p-2 bg-blue-500 text-white rounded"
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
    </div>
  );
}

export default Question;
