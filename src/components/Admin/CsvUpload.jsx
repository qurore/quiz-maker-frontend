import { useState } from 'react';
import axios from 'axios';

function CsvUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/upload-csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setFile(null);
      onUploadSuccess();
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadSample = () => {
    const sampleCsvUrl = '/sample.csv';
    const link = document.createElement('a');
    link.href = sampleCsvUrl;
    link.download = 'sample.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">CSV Format Requirements:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Required columns: subject, chapter, type, question, answers, explanation</li>
          <li>For MCQ type: include option_1 through option_6 (at least 2 options required)</li>
          <li>Answers should be comma-separated numbers corresponding to correct options</li>
          <li><button 
              onClick={handleDownloadSample}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Download sample CSV template
            </button>
          </li>
        </ul>
        
        <div className="mt-3 text-sm font-medium text-gray-700 bg-gray-100 p-2 rounded">
          ⚠️ Note: If a Subject with the same name already exists, the existing data will be <strong>overwritten</strong> and incorrect questions will be <strong>deleted</strong>.
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-100 file:text-gray-700
            hover:file:bg-gray-200"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`bg-blue-600 text-white px-4 py-2 rounded 
            ${(!file || uploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-gray-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CsvUpload; 