import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/lists/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('File uploaded and distributed successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error uploading file');
    }
  };

  return (
    <div className="mb-5">
      <h3>Upload CSV/XLSX/XLS</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".csv,.xlsx,.xls" required />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadCSV;