import SubjectList from './SubjectList';
import CsvUpload from './CsvUpload';
import { useRef } from 'react';

function AdminDashboard({ onLogout }) {
  const subjectListRef = useRef();

  const handleUploadSuccess = () => {
    // SubjectListコンポーネントの再フェッチをトリガー
    subjectListRef.current?.fetchSubjects();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
        
        <SubjectList ref={subjectListRef} />
        <CsvUpload onUploadSuccess={handleUploadSuccess} />

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard; 