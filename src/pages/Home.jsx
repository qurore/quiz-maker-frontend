import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/subjects`).then((response) => {
      setSubjects(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Subject</h1>
      <div className="grid grid-cols-1 gap-4">
        {subjects.length === 0 ? (
          <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            No subjects available. Please upload files to add subjects from{' '}
            <Link to="/admin" className="text-blue-500 hover:text-blue-700 underline">
              Admin page
            </Link>
            .
          </div>
        ) : (
          subjects.map((subject) => (
            <button
              key={subject.id}
              className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => navigate(`/quiz/${subject.id}`)}
            >
              <div className="flex justify-between items-center">
                <span>{subject.name}</span>
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {subject.questionCount} questions
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
