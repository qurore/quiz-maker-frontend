import React from 'react';

function UserGuide() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">User Guide</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">Welcome to the Quiz Maker application! This guide will help you understand how to use our platform effectively.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Managing Quizzes</h2>
          
          <h3 className="text-lg font-semibold mb-2">Subject Management</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Access the Admin Dashboard using your credentials</li>
            <li>View all subjects and their question counts</li>
            <li>Edit subject names by clicking the edit icon</li>
            <li>Delete subjects using the delete icon (this will remove all associated questions)</li>
          </ol>

          <h3 className="text-lg font-semibold mb-2">Bulk Question Upload</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the sample CSV template for reference</li>
            <li>Prepare your CSV file with the required columns:
              <ul className="list-disc list-inside ml-6 mt-2 text-gray-600">
                <li>subject, chapter, type, question, answers, explanation</li>
                <li>For MCQs: include option_1 through option_6</li>
              </ul>
            </li>
            <li>Upload your CSV file using the upload interface</li>
          </ol>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Taking a Quiz</h2>
          
          <h3 className="text-lg font-semibold mb-2">Starting a Quiz</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Select a subject from the home page</li>
            <li>Choose one or more chapters to include in your quiz</li>
            <li>Optional: Enable "Shuffle Questions" to randomize question order</li>
            <li>Click "Start" for a new quiz or "Review" for previously incorrect questions</li>
          </ol>

          <h3 className="text-lg font-semibold mb-2">During the Quiz</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Answer questions using:
              <ul className="list-disc list-inside ml-6 text-gray-600">
                <li>Multiple choice: Click an option or use number keys (1-6)</li>
                <li>Fill in the blank: Type your answer</li>
              </ul>
            </li>
            <li>After answering:
              <ul className="list-disc list-inside ml-6 text-gray-600">
                <li>See immediate feedback and explanation</li>
                <li>Use "Mark for Review" for questions to revisit later</li>
                <li>Press Enter or click "Next" to continue</li>
              </ul>
            </li>
            <li>Track your progress with the question counter and score</li>
            <li>Use "Quit" to end the quiz early</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Review Mode</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Access previously incorrect questions</li>
            <li>Practice specific chapters or subjects</li>
            <li>Mark questions as correct when mastered</li>
            <li>Track improvement over time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserGuide; 