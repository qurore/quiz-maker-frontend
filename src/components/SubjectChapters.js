import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SubjectChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chaptersResponse, subjectResponse] = await Promise.all([
          axios.get(`http://localhost:5001/api/subjects/${subjectId}/chapters`),
          axios.get(`http://localhost:5001/api/subjects/${subjectId}`)
        ]);
        setChapters(chaptersResponse.data);
        setSubjectName(subjectResponse.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subjectId]);

  const toggleChapterSelection = (chapter) => {
    setSelectedChapters(prev => 
      prev.includes(chapter) 
        ? prev.filter(c => c !== chapter) 
        : [...prev, chapter]
    );
  };

  const handleStartQuiz = () => {
    if (selectedChapters.length > 0) {
      navigate(`/quiz/${subjectId}/custom`, { state: { selectedChapters, shuffleQuestions } });
    } else {
      alert('Please select at least one chapter to start the quiz.');
    }
  };

  const handleReviewQuiz = () => {
    if (selectedChapters.length > 0) {
      navigate(`/quiz/${subjectId}/review`, { state: { selectedChapters, shuffleQuestions } });
    } else {
      alert('Please select at least one chapter to start the review quiz.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{subjectName} Quizzes</h1>
      <div className="grid grid-cols-1 gap-4 mb-6">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            className={`p-4 rounded transition-colors duration-300 ${
              selectedChapters.includes(chapter)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
            }`}
            onClick={() => toggleChapterSelection(chapter)}
          >
            {chapter}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center mb-4">
        <input
          type="checkbox"
          id="shuffleQuestions"
          checked={shuffleQuestions}
          onChange={(e) => setShuffleQuestions(e.target.checked)}
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
          onClick={handleReviewQuiz}
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
          onClick={handleStartQuiz}
          disabled={selectedChapters.length === 0}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default SubjectChapters;
