import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import SubjectChapters from 'components/SubjectChapters';
import Quiz from 'components/Quiz';
import Navbar from 'components/Navbar';
import UserGuide from 'pages/UserGuide';
import Admin from 'pages/Admin';
import Review from 'pages/Review';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz/:subjectId" element={<SubjectChapters />} />
            <Route path="/quiz/:subjectId/custom" element={<Quiz />} />
            <Route path="/quiz/:subjectId/review" element={<Quiz />} />
            <Route path="/user-guide" element={<UserGuide />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/review" element={<Review />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
