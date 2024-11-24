import PropTypes from 'prop-types';

function TotalQuestions({ count }) {
  return (
    <div className="text-center mb-4">
      <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
        Total Questions: {count}
      </span>
    </div>
  );
}

TotalQuestions.propTypes = {
  count: PropTypes.number.isRequired,
};

export default TotalQuestions; 