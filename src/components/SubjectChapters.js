import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SubjectChapters() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/subjects/${subjectId}/chapters`)
      .then((response) => {
        setChapters(response.data);
      });
  }, [subjectId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Chapter</h1>
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
