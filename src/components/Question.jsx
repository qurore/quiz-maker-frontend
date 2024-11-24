import { useState, useEffect, useCallback } from 'react';
import QuestionHeader from 'components/Question/QuestionHeader';
import QuestionContent from 'components/Question/QuestionContent';
import QuestionActions from 'components/Question/QuestionActions';
import QuestionFeedback from 'components/Question/QuestionFeedback';
import QuitModal from 'components/Question/QuitModal';

const Question = ({ 
  data, 
  onNext, 
  onQuit, 
  onIncorrect, 
  onCorrect, 
  currentQuestionNumber, 
  totalQuestions, 
  isReviewQuiz, 
  correctCount, 
  totalAnsweredCount 
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [pendingIncorrect, setPendingIncorrect] = useState(false);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const resetQuestion = useCallback(() => {
    Promise.resolve().then(() => {
      setSelectedOption('');
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(false);
      setPendingIncorrect(false);
      setMarkedForReview(false);
      onNext();
    });
  }, [onNext]);

  const checkAnswer = useCallback((selectedAnswer) => {
    let correct = false;
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      correct = data.answer.includes(parseInt(selectedAnswer));
    } else if (data.questionType === 'FIB') {
      correct = selectedAnswer.trim().toLowerCase() === data.answer[0].toLowerCase();
    }
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      onCorrect(data);
    } else {
      setPendingIncorrect(true);
    }
  }, [data, onCorrect]);

  const getCorrectAnswerText = () => {
    if (data.questionType === 'MCQ' || data.questionType === 'SA') {
      return data.answer.map(answerIndex => data.options[answerIndex]).join(', ');
    }
    return data.answer.join(', ');
  };

  const handleNext = useCallback(async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (pendingIncorrect) {
        await onIncorrect(data).catch(error => {
          console.error('Error handling incorrect answer:', error);
        });
      }
      resetQuestion();
    } catch (error) {
      console.error('Error in handleNext:', error);
    } finally {
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsProcessing(false);
    }
  }, [isProcessing, pendingIncorrect, data, onIncorrect, resetQuestion]);

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
    onIncorrect({ ...data, markedForReview: true });
    resetQuestion();
  };

  const handleMarkAsCorrect = () => {
    setIsCorrect(true);
    setPendingIncorrect(false);
    onCorrect();
    resetQuestion();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isProcessing) return;

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
  }, [data, isAnswered, isProcessing, handleNext, checkAnswer]);

  if (!data) {
    return <div>Loading question...</div>;
  }

  return (
    <div>
      <QuestionHeader 
        currentQuestionNumber={currentQuestionNumber}
        totalQuestions={totalQuestions}
        isReviewQuiz={isReviewQuiz}
        markedForReview={markedForReview}
        correctCount={correctCount}
        totalAnsweredCount={totalAnsweredCount}
      />
      
      <h2 className="text-lg whitespace-pre-wrap">{data.questionText}</h2>
      
      <QuestionContent 
        data={data}
        isAnswered={isAnswered}
        selectedOption={selectedOption}
        userAnswer={userAnswer}
        setSelectedOption={setSelectedOption}
        setUserAnswer={setUserAnswer}
        checkAnswer={checkAnswer}
        isCorrect={isCorrect}
      />

      <QuestionActions 
        isAnswered={isAnswered}
        isCorrect={isCorrect}
        isProcessing={isProcessing}
        handleQuitClick={handleQuitClick}
        handleMarkAsReview={handleMarkAsReview}
        handleMarkAsCorrect={handleMarkAsCorrect}
        handleSkip={handleSkip}
        handleNext={handleNext}
      />

      {isAnswered && (
        <QuestionFeedback 
          isCorrect={isCorrect}
          getCorrectAnswerText={getCorrectAnswerText}
          explanation={data.explanation}
        />
      )}

      {showQuitModal && (
        <QuitModal 
          handleOutsideClick={handleOutsideClick}
          handleCancelQuit={handleCancelQuit}
          handleConfirmQuit={handleConfirmQuit}
        />
      )}
    </div>
  );
}

export default Question;
