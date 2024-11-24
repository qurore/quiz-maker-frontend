import PropTypes from 'prop-types';

function ChapterList({ chapters, selectedChapters, onToggleChapter }) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      {chapters.map((chapter) => (
        <button
          key={chapter.name}
          className={`p-4 rounded transition-colors duration-300 ${
            selectedChapters.includes(chapter.name)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
          }`}
          onClick={() => onToggleChapter(chapter.name)}
        >
          <div className="flex justify-between items-center">
            <span>{chapter.name}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              selectedChapters.includes(chapter.name)
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}>
              {chapter.count} questions
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

ChapterList.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedChapters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleChapter: PropTypes.func.isRequired,
};

export default ChapterList; 