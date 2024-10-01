import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SubjectChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [subjectName, setSubjectName] = useState('');

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{subjectName} Quizzes</h1>
      <div className="grid grid-cols-1 gap-4">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            className="p-4 bg-blue-500 text-white rounded"
            onClick={() => navigate(`/quiz/${subjectId}/${chapter}`)}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SubjectChapters;
