import SubjectList from './SubjectList';
import CsvUpload from './CsvUpload';
import { useRef } from 'react';

function AdminDashboard({ onLogout }) {
  const subjectListRef = useRef();

  const handleUploadSuccess = () => {
    subjectListRef.current?.fetchSubjects();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <SubjectList ref={subjectListRef} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <CsvUpload onUploadSuccess={handleUploadSuccess} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; 