import React from 'react';

const QuitModal = ({ 
  handleOutsideClick, 
  handleCancelQuit, 
  handleConfirmQuit 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-5 rounded-lg shadow-xl relative">
        <h2 className="text-xl font-semibold mb-4">Confirm Quit</h2>
        <p className="mb-6">Do you really want to quit?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded w-20"
            onClick={handleCancelQuit}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-400 text-white rounded w-20"
            onClick={handleConfirmQuit}
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuitModal;
