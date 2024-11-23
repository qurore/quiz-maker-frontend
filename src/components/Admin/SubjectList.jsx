import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {subjects.map(subject => (
        <div key={subject.id}>
          {editingId === subject.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          ) : (
            <span>{subject.name}</span>
          )}
          <button onClick={() => handleEdit(subject)}>Edit</button>
          <button onClick={() => handleSave(subject.id)}>Save</button>
          <button onClick={() => handleDelete(subject.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default SubjectList; 