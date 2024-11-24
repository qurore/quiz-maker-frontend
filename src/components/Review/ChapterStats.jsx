import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ChapterStats = ({ chapters }) => {
  const navigate = useNavigate();
  
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const handleChapterClick = (subjectId) => {
    navigate(`/quiz/${subjectId}`);
  };

  return (
    <div className="space-y-2">
      {chapters
        .sort((a, b) => (b.incorrect / b.total) - (a.incorrect / a.total))
        .slice(0, 5)
        .map(chapter => (
          <div 
            key={`${chapter.subjectId}-${chapter.chapter}`} 
            className="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
            onClick={() => handleChapterClick(chapter.subjectId)}
          >
            <div className="flex items-center">
              <FiAlertCircle className={`mr-2 ${
                chapter.incorrect / chapter.total > 0.7 ? 'text-red-500' : 'text-yellow-500'
              }`} />
              <span className="text-gray-700 hover:text-blue-600">
                {chapter.chapter} ({chapter.subjectName || chapter.subjectId})
              </span>
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