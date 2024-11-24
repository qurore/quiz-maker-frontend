import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleEdit = (subject) => {
    setEditingId(subject.id);
    setEditName(subject.name);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/subjects/${id}`, {
        name: editName
      });
      setEditingId(null);
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://localhost:5001/api/subjects/${id}`);
        fetchSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-bold">Subjects</h2>
      <p className="text-sm text-gray-500">Manage your subjects here.</p>
      {subjects.map(subject => (
        <div 
          key={subject.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-grow flex items-center gap-4">
            {editingId === subject.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <div className="flex-grow p-2">{subject.name}</div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {editingId === subject.id ? (
              <>
                <button
                  onClick={() => handleSave(subject.id)}
                  className="p-2 text-green-600 hover:text-green-800 transition-colors"
                  title="Save"
                >
                  <FiCheck className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  title="Cancel"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleEdit(subject)}
                className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit"
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => handleDelete(subject.id)}
              className="p-2 text-red-600 hover:text-red-800 transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SubjectList; 