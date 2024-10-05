import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Question from './Question';

function Quiz() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedChapters = location.state?.selectedChapters || [];
  const shuffleQuestions = location.state?.shuffleQuestions || false;
  const isReviewQuiz = location.pathname.includes('/review');
  const [questions, setQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        let endpoint;
        if (isReviewQuiz) {
          endpoint = `http://localhost:5001/api/incorrects?subjectId=${subjectId}&chapters=${selectedChapters.join(',')}`;
        } else {
          endpoint = `http://localhost:5001/api/questions?subjectId=${subjectId}&chapter=${selectedChapters.join(',')}`;
        }
        const response = await axios.get(endpoint);
        let fetchedQuestions = response.data;
        
        if (shuffleQuestions) {
          fetchedQuestions = shuffleArray(fetchedQuestions);
        }
        
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchQuestions();
  }, [subjectId, selectedChapters, isReviewQuiz, shuffleQuestions]);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleCorrect = async (question) => {
    setCorrectCount(correctCount + 1);
    if (isReviewQuiz) {
      try {
        await axios.delete('http://localhost:5001/api/incorrects', {
          data: {
            subjectId: question.subjectId,
            questionId: question.questionId,
            chapter: question.chapter
          }
        });
      } catch (error) {
        console.error("Error removing question from incorrects:", error);
      }
    }
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

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="text-center">
          <p className="text-xl">Loading questions...</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">No questions available for the selected chapters.</p>
          <button
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={handleQuit}
          >
            Go Back
          </button>
        </div>
      ) : currentQuestionIndex >= questions.length ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
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
          isReviewQuiz={isReviewQuiz}
        />
      )}
    </div>
  );
}

export default Quiz;
