import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SubjectChapters from './components/SubjectChapters';
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:subjectId" element={<SubjectChapters />} />
            <Route path="/quiz/:subjectId/:chapter" element={<Quiz />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
