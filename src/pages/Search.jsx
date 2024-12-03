import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const [searchParams] = useSearchParams();
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const word = searchParams.get('word');

  useEffect(() => {
    const lookupWord = async () => {
      if (!word) return;
      
      setLoading(true);
      setError(null);
      setNotFound(false);
      
      try {
        const response = await axios.get(`http://localhost:5000/api/wikipedia/${word}`);
        
        if (response.status === 404) {
          setNotFound(true);
        } else {
          setDefinition(response.data);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err.message || 'Failed to fetch definition');
        }
      } finally {
        setLoading(false);
      }
    };

    lookupWord();
  }, [word]);

  if (!word) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">No term specified</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Definition: {word}</h1>
      
      {loading && (
        <div className="text-center text-gray-500">Loading definition...</div>
      )}

      {notFound && (
        <div className="text-center font-semibold text-gray-800 text-lg">
          No Wikipedia entry found for "{word}"
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {definition && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">{definition.title}</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {definition.extract}
            </p>
            <a
              href={definition.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Read more on Wikipedia
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search; 