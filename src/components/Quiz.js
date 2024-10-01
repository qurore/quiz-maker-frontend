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

  const handleQuit = () => {
    navigate(`/quiz/${subjectId}`);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div>Loading questions...</div>
      ) : questions.length === 0 ? (
        <div>No questions available for this chapter.</div>
      ) : currentQuestionIndex >= questions.length ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Quiz Completed!</h1>
          <p>You have completed the quiz.</p>
          <button
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={handleQuit}
          >
            Finish
          </button>
        </div>
      ) : (
        <Question
          data={questions[currentQuestionIndex]}
          onNext={handleNext}
          onQuit={handleQuit}
          onIncorrect={handleIncorrect}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

export default Quiz;
