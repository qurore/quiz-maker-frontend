import React from 'react';
import StatsCard from './StatsCard';
import SubjectStats from './SubjectStats';
import ChapterStats from './ChapterStats';

const ReviewStats = ({ stats }) => {
  if (!stats) return null;

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard title="Overall Progress">
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
      </StatsCard>

      <StatsCard title="By Subject">
        <SubjectStats subjects={stats.bySubject} />
      </StatsCard>

      <StatsCard title="Top Problem Areas">
        <ChapterStats chapters={stats.byChapter} />
      </StatsCard>
    </div>
  );
};

export default ReviewStats; 