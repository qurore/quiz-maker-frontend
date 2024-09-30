import { useState } from 'react';

function Question({ data, onNext, onIncorrect }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    let correct = false;
    if (data.type === 'MCQ') {
      correct = selectedOption === data.answer;
    } else {
      correct = userAnswer.trim().toLowerCase() === data.answer.toLowerCase();
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (!correct) {
      onIncorrect(data);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">{data.questionText}</h2>
      {data.type === 'MCQ' ? (
        <div className="mt-4">
          {data.options.map((option, index) => (
            <button
              key={index}
              className={`block w-full text-left p-2 border mb-2 ${
                selectedOption === option ? 'bg-blue-200' : ''
              }`}
              onClick={() => setSelectedOption(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            className="border p-2 w-full"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswered}
          />
        </div>
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
              Incorrect. The correct answer is: <strong>{data.answer}</strong>
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
