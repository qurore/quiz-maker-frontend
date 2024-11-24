import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ChapterList from './Chapters/ChapterList';
import QuizControls from './Chapters/QuizControls';
import TotalQuestions from './Chapters/TotalQuestions';

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

  const totalSelectedQuestions = chapters
    .filter(chapter => selectedChapters.includes(chapter.name))
    .reduce((sum, chapter) => sum + chapter.count, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{subjectName} Quizzes</h1>
      
      <ChapterList
        chapters={chapters}
        selectedChapters={selectedChapters}
        onToggleChapter={toggleChapterSelection}
      />

      {selectedChapters.length > 0 && (
        <TotalQuestions count={totalSelectedQuestions} />
      )}

      <QuizControls
        shuffleQuestions={shuffleQuestions}
        onShuffleChange={setShuffleQuestions}
        selectedChapters={selectedChapters}
        onStartQuiz={handleStartQuiz}
        onReviewQuiz={handleReviewQuiz}
      />
    </div>
  );
}

export default SubjectChapters;
