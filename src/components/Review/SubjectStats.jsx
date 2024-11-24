import React from 'react';

const SubjectStats = ({ subjects }) => {
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-2">
      {subjects.map(subject => (
        <div key={subject.subjectId} className="flex justify-between items-center">
          <span className="text-gray-700">{subject.subjectId}</span>
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