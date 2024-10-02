import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import { useNavigate } from 'react-router-dom';

function ReviewIncorrect() {
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncorrectQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/incorrects');
        setIncorrectQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching incorrect questions:", error);
        setIsLoading(false);
      }
    };

    fetchIncorrectQuestions();
  }, []);

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuit = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading incorrect questions...</div>;
  }

  if (incorrectQuestions.length === 0) {
    return <div>No incorrect questions to review.</div>;
  }

  if (currentQuestionIndex >= incorrectQuestions.length) {
    return (
      <div>
        <h1>Review Completed!</h1>
        <p>You've reviewed all your incorrect questions.</p>
        <button onClick={handleQuit}>Finish</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Review Incorrect Questions</h1>
      <Question
        data={incorrectQuestions[currentQuestionIndex]}
        onNext={handleNext}
        onQuit={handleQuit}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={incorrectQuestions.length}
      />
    </div>
  );
}

export default ReviewIncorrect;
