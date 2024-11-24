import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ChapterStats = ({ chapters }) => {
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="space-y-2">
      {chapters
        .sort((a, b) => (b.incorrect / b.total) - (a.incorrect / a.total))
        .slice(0, 5)
        .map(chapter => (
          <div key={`${chapter.subjectId}-${chapter.chapter}`} className="flex justify-between items-center">
            <div className="flex items-center">
              <FiAlertCircle className={`mr-2 ${
                chapter.incorrect / chapter.total > 0.7 ? 'text-red-500' : 'text-yellow-500'
              }`} />
              <span className="text-gray-700">{chapter.chapter}</span>
            </div>
            <span className="font-medium text-red-500">
              {formatPercentage(chapter.incorrect / chapter.total)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ChapterStats; 