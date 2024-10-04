import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SubjectChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);

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
      navigate(`/quiz/${subjectId}/custom`, { state: { selectedChapters } });
    } else {
      alert('Please select at least one chapter to start the quiz.');
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
      <button
        className={`p-2 rounded w-200 mx-auto block transition-colors duration-300 ${
          selectedChapters.length > 0
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={handleStartQuiz}
        disabled={selectedChapters.length === 0}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default SubjectChapters;
