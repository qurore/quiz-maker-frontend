import { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

function SubjectListItem({ 
  subject, 
  onSave, 
  onDelete 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(subject.name);

  const handleEdit = () => {
    setIsEditing(true);
    setEditName(subject.name);
  };

  const handleSave = async () => {
    await onSave(subject.id, editName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(subject.name);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-grow flex items-center gap-4">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between flex-grow">
            <span className="p-2">{subject.name}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {subject.questionCount} questions
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
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
            onClick={handleEdit}
            className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            title="Edit"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => onDelete(subject.id)}
          className="p-2 text-red-600 hover:text-red-800 transition-colors"
          title="Delete"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default SubjectListItem; 