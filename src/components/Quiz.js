import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Question from './Question';

function Quiz() {
  const { subjectId, chapter } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(
    JSON.parse(localStorage.getItem(`incorrect_${subjectId}_${chapter}`)) || []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5001/api/questions', {
        params: { subjectId, chapter },
      })
      .then((response) => {
        setQuestions(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      });
  }, [subjectId, chapter]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleIncorrect = (question) => {
    const updatedIncorrect = [...incorrectQuestions, question];
    setIncorrectQuestions(updatedIncorrect);
    localStorage.setItem(
      `incorrect_${subjectId}_${chapter}`,
      JSON.stringify(updatedIncorrect)
    );
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div>Loading questions...</div>
      ) : questions.length === 0 ? (
        <div>No questions available for this chapter.</div>
      ) : currentQuestionIndex >= questions.length ? (
        <div>
          <h1 className="text-xl font-bold">Quiz Completed!</h1>
          <p>You have completed the quiz.</p>
        </div>
      ) : (
        <Question
          data={questions[currentQuestionIndex]}
          onNext={handleNext}
          onIncorrect={handleIncorrect}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
      <button
        className="mt-4 p-2 bg-gray-500 text-white rounded"
        onClick={handleGoHome}
      >
        Quit
      </button>
    </div>
  );
}

export default Quiz;
