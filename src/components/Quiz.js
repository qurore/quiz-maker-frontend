import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Question from './Question';
function Quiz() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [chapter, setChapter] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [order, setOrder] = useState('sequential'); // or 'random'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectQuestions, setIncorrectQuestions] = useState(
    JSON.parse(localStorage.getItem(`incorrect_${subjectId}`)) || []
  );

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/questions', {
        params: { subjectId, chapter },
      })
      .then((response) => {
        let fetchedQuestions = response.data;
        if (order === 'random') {
          fetchedQuestions.sort(() => Math.random() - 0.5);
        }
        setQuestions(fetchedQuestions.slice(0, numQuestions));
      });
  }, [subjectId, chapter, numQuestions, order]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleIncorrect = (question) => {
    const updatedIncorrect = [...incorrectQuestions, question];
    setIncorrectQuestions(updatedIncorrect);
    localStorage.setItem(
      `incorrect_${subjectId}`,
      JSON.stringify(updatedIncorrect)
    );
  };
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      {currentQuestionIndex >= questions.length ? (
        <div>
          <h1 className="text-xl font-bold">Quiz Completed!</h1>
          <p>You have completed the quiz.</p>
        </div>
      ) : (
        <Question
          data={questions[currentQuestionIndex]}
          onNext={handleNext}
          onIncorrect={handleIncorrect}
        />
      )}
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleGoHome}
      >
        Go Back to Home
      </button>
    </div>
  );
}
export default Quiz;
