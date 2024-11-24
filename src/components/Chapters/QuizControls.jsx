import PropTypes from 'prop-types';

function QuizControls({ 
  shuffleQuestions, 
  onShuffleChange, 
  selectedChapters, 
  onStartQuiz, 
  onReviewQuiz 
}) {
  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <input
          type="checkbox"
          id="shuffleQuestions"
          checked={shuffleQuestions}
          onChange={(e) => onShuffleChange(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="shuffleQuestions">Shuffle Questions</label>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className={`p-2 rounded w-1/6 transition-colors duration-300 ${
            selectedChapters.length > 0
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={onReviewQuiz}
          disabled={selectedChapters.length === 0}
        >
          Review
        </button>
        <button
          className={`p-2 rounded w-1/6 transition-colors duration-300 ${
            selectedChapters.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={onStartQuiz}
          disabled={selectedChapters.length === 0}
        >
          Start
        </button>
      </div>
    </>
  );
}

QuizControls.propTypes = {
  shuffleQuestions: PropTypes.bool.isRequired,
  onShuffleChange: PropTypes.func.isRequired,
  selectedChapters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onStartQuiz: PropTypes.func.isRequired,
  onReviewQuiz: PropTypes.func.isRequired,
};

export default QuizControls; 