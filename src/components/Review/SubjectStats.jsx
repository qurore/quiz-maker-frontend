import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubjectStats = ({ subjects }) => {
  const navigate = useNavigate();
  
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/quiz/${subjectId}`);
  };

  console.log(subjects);

  return (
    <div className="space-y-2">
      {subjects.map(subject => (
        <div 
          key={subject.subjectId} 
          className="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
          onClick={() => handleSubjectClick(subject.subjectId)}
        >
          <span className="text-gray-700 hover:text-blue-600">
            {subject.subjectName || subject.subjectId}
          </span>
          <span className={`font-medium ${
            subject.incorrect / subject.total > 0.5 ? 'text-red-500' : 'text-green-500'
          }`}>
            {formatPercentage(subject.incorrect / subject.total)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SubjectStats; 