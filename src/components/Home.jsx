import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/api/subjects').then((response) => {
      setSubjects(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Subject</h1>
      <div className="grid grid-cols-1 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            className="p-4 bg-blue-500 text-white rounded"
            onClick={() => navigate(`/quiz/${subject.id}`)}
          >
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
