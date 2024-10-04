import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Question from './Question';

function Quiz() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedChapters = location.state?.selectedChapters || [];
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchQuestions = async () => {
      try {
        const questionsPromises = selectedChapters.map(chapter => 
          axios.get('http://localhost:5001/api/questions', {
            params: { subjectId, chapter },
          })
        );
        const responses = await Promise.all(questionsPromises);
        const allQuestions = responses.flatMap(response => response.data);
        setQuestions(allQuestions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [subjectId, selectedChapters]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleCorrect = () => {
    setCorrectCount(correctCount + 1);
  };

  const handleIncorrect = async (question) => {
    try {
      await axios.post('http://localhost:5001/api/incorrects', {
        subjectId,
        questionId: question.questionId,
        chapter: question.chapter
      });
    } catch (error) {
      console.error("Error adding incorrect question:", error);
    }
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
          <p className="mt-2 text-lg">
            Your score: <strong>{correctCount} / {questions.length}</strong>
          </p>
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
          onCorrect={handleCorrect}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      )}
    </div>
  );
}

export default Quiz;
