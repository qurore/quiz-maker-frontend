import { useState } from 'react';

function Question({ data, onNext, onIncorrect }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    let correct = false;
    if (data.questionType === 'MCQ') {
      correct = data.answer.includes(parseInt(selectedOption));
    } else if (data.questionType === 'FIB') {
      correct = userAnswer.trim().toLowerCase() === data.answer[0].toLowerCase();
    } else if (data.questionType === 'SA') {
      correct = data.answer.includes(parseInt(selectedOption));
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (!correct) {
      onIncorrect(data);
    }
  };

  if (!data) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">{data.questionText}</h2>
      {(data.questionType === 'MCQ' || data.questionType === 'SA') && data.options ? (
        <div className="mt-4">
          {Object.entries(data.options).map(([key, value]) => (
            <button
              key={key}
              className={`block w-full text-left p-2 border mb-2 ${
                selectedOption === key ? 'bg-blue-200' : ''
              }`}
              onClick={() => setSelectedOption(key)}
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
            disabled={isAnswered}
          />
        </div>
      ) : (
        <div>Unsupported question type</div>
      )}
      {!isAnswered ? (
        <button
          className="mt-4 p-2 bg-green-500 text-white rounded"
          onClick={checkAnswer}
        >
          Submit
        </button>
      ) : (
        <div className="mt-4">
          {isCorrect ? (
            <div className="text-green-500">Correct! 🎉</div>
          ) : (
            <div className="text-red-500">
              Incorrect. The correct answer is: <strong>{data.answer.join(', ')}</strong>
            </div>
          )}
          <p className="mt-2">{data.explanation}</p>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Question;
