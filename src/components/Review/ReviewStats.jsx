import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const ReviewStats = ({ stats }) => {
  if (!stats) return null;

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Overall Stats */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Total Questions</p>
            <p className="text-2xl font-bold">{stats.overall.total}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Incorrect</p>
            <p className="text-2xl font-bold text-red-500">
              {formatPercentage(stats.overall.ratio)}
            </p>
          </div>
        </div>
      </div>

      {/* Subject Stats */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">By Subject</h3>
        <div className="space-y-2">
          {stats.bySubject.map(subject => (
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
      </div>

      {/* Chapter Stats */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Top Problem Areas</h3>
        <div className="space-y-2">
          {stats.byChapter
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
      </div>
    </div>
  );
};

export default ReviewStats; 