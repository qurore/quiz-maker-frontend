import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWordDefinition } from 'services/DictionaryService';

function Search() {
  const [searchParams] = useSearchParams();
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const word = searchParams.get('word');

  useEffect(() => {
    const lookupWord = async () => {
      if (!word) return;
      
      setLoading(true);
      try {
        const result = await fetchWordDefinition(word);
        if (result.success) {
          setDefinition(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to fetch definition');
      } finally {
        setLoading(false);
      }
    };

    lookupWord();
  }, [word]);

  if (!word) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">No word specified</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Definition: {word}</h1>
      
      {loading && (
        <div className="text-center text-gray-500">Loading definition...</div>
      )}

      {error && (
        <div className="text-center text-red-500">{error}</div>
      )}

      {definition && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          {definition.meanings.map((meaning, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {meaning.partOfSpeech}
              </h2>
              <ol className="list-decimal list-inside space-y-3">
                {meaning.definitions.map((def, idx) => (
                  <li key={idx} className="text-gray-600">
                    <span>{def.definition}</span>
                    {def.example && (
                      <p className="ml-6 mt-1 text-gray-500 italic">
                        Example: "{def.example}"
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search; 