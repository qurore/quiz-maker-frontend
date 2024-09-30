import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SubjectChapters from './components/SubjectChapters';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:subjectId" element={<SubjectChapters />} />
        <Route path="/quiz/:subjectId/:chapter" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
