import React from 'react';

function UserGuide() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">User Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">Welcome to the Quiz Maker application! This guide will help you understand how to use our platform effectively.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Creating a Quiz</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click on the "Create Quiz" button</li>
          <li>Enter your quiz title and description</li>
          <li>Add questions and multiple choice answers</li>
          <li>Save your quiz when finished</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Taking a Quiz</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Browse available quizzes on the home page</li>
          <li>Click "Start Quiz" on your chosen quiz</li>
          <li>Select your answers for each question</li>
          <li>Submit your answers to see your results</li>
        </ol>
      </section>
    </div>
  );
}

export default UserGuide; 