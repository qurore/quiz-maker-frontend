import { useState } from 'react';
import axios from 'axios';

function CsvUpload() {
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
      await axios.post('http://localhost:5001/api/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      setFile(null);
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`bg-blue-500 text-white px-4 py-2 rounded 
            ${(!file || uploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CsvUpload; 