import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import SubjectListItem from './SubjectListItem';

const SubjectList = forwardRef((props, ref) => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchSubjects
  }));

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSave = async (id, newName) => {
    try {
      await axios.put(`http://localhost:5000/api/subjects/${id}`, {
        name: newName
      });
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://localhost:5000/api/subjects/${id}`);
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
      
      {subjects.length === 0 ? (
        <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
          No subjects available. Please add a new subject.
        </div>
      ) : (
        subjects.map(subject => (
          <SubjectListItem
            key={subject.id}
            subject={subject}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
});

export default SubjectList; 